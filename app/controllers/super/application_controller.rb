module Super
  # Provides a default implementation for each of the resourceful actions
  class ApplicationController < ActionController::Base
    include Super::InlineCallback
    include Pluggable.new(:super_application_controller)

    register_inline_callback(:index_paginate, on: :index, after: :yield)

    helper_method :action_inquirer
    helper_method :controls

    rescue_from Error::ClientError do |exception|
      code, default_message =
        case exception
        when Error::UnprocessableEntity
          [422, "Unprocessable entity"]
        when Error::NotFound
          [404, "Not found"]
        when Error::Forbidden
          [403, "Forbidden"]
        when Error::Unauthorized
          [401, "Unauthorized"]
        when Error::BadRequest, Error::ClientError
          [400, "Bad request"]
        end

      flash.now.alert =
        if exception.message == exception.class.name.to_s
          default_message
        else
          exception.message
        end

      render "nothing", status: code
    end

    def index
      with_inline_callbacks do
        @resources = controls.scope(action: action_inquirer)
      end
    end

    def create
      @resource = controls.scope(action: action_inquirer).build(create_permitted_params)

      if @resource.save
        redirect_to polymorphic_path(Super.configuration.path_parts(@resource))
      else
        render :new, status: :bad_request
      end
    end

    def new
      @resource = controls.scope(action: action_inquirer).build
    end

    def edit
      @resource = controls.scope(action: action_inquirer).find(params[:id])
    end

    def show
      @resource = controls.scope(action: action_inquirer).find(params[:id])
    end

    def update
      @resource = controls.scope(action: action_inquirer).find(params[:id])

      if @resource.update(update_permitted_params)
        redirect_to polymorphic_path(Super.configuration.path_parts(@resource))
      else
        render :edit, status: :bad_request
      end
    end

    def destroy
      @resource = controls.scope(action: action_inquirer).find(params[:id])
      if @resource.destroy
        redirect_to polymorphic_path(Super.configuration.path_parts(controls.model))
      else
        redirect_to polymorphic_path(Super.configuration.path_parts(@resource))
      end
    end

    private

    def index_paginate
      @pagination = Pagination.new(
        total_count: @resources.size,
        limit: Super.configuration.index_resources_per_page,
        query_params: request.GET,
        page_query_param: :page
      )

      @resources = @resources
        .limit(@pagination.limit)
        .offset(@pagination.offset)
    end

    def controls
      Super::Controls.new(new_controls)
    end

    def create_permitted_params
      controls.permitted_params(params, action: action_inquirer)
    end

    def update_permitted_params
      controls.permitted_params(params, action: action_inquirer)
    end

    def action_inquirer
      @action_inquirer ||= ActionInquirer.new(
        ActionInquirer.default_resources,
        params[:action]
      )
    end
  end
end
