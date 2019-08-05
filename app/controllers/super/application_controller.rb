module Super
  class ApplicationController < ActionController::Base
    include Super::InlineCallback
    include Pluggable.new(:super_application_controller)

    register_inline_callback(:index_paginate, on: :index, after: :yield)

    helper_method :controls

    def index
      with_inline_callbacks do
        @resources = controls.index_scope
      end
    end

    def create
      @resource = controls.create_scope.build(permitted_create_params)

      if @resource.save
        redirect_to polymorphic_path(Super.configuration.path_parts(@resource))
      else
        render :new, status: :bad_request
      end
    end

    def new
      @resource = controls.new_scope.build
    end

    def edit
      @resource = controls.edit_scope.find(params[:id])
    end

    def show
      @resource = controls.show_scope.find(params[:id])
    end

    def update
      @resource = controls.update_scope.find(params[:id])

      if @resource.update(permitted_update_params)
        redirect_to polymorphic_path(Super.configuration.path_parts(@resource))
      else
        render :edit, status: :bad_request
      end
    end

    def destroy
      @resource = controls.destroy_scope.find(params[:id])
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
        current_pageno: params[:page],
        limit: Super.configuration.index_resources_per_page
      )
      @resources = @resources
        .limit(@pagination.limit)
        .offset(@pagination.offset)
    end

    def controls
      Controls.new(dashboard)
    end

    def permitted_create_params
      controls.permitted_create_params(params)
    end

    def permitted_update_params
      controls.permitted_update_params(params)
    end
  end
end
