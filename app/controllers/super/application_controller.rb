module Super
  # Provides a default implementation for each of the resourceful actions
  class ApplicationController < ActionController::Base
    include Pluggable.new(:super_application_controller)

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
      @resources = Step.load_resources(controls, params, action_inquirer)
      @pagination = Step.initialize_pagination(@resources, request.GET)
      @resources = Step.paginate_resources(@resources, @pagination)
    end

    def show
      @resource = Step.load_resource(controls, params, action_inquirer)
    end

    def new
      @resource = Step.build_resource(controls, action_inquirer)
    end

    def create
      @resource = Step.build_resource_with_params(controls, action_inquirer, permitted_params)

      if @resource.save
        redirect_to polymorphic_path(Super.configuration.path_parts(@resource))
      else
        render :new, status: :bad_request
      end
    end

    def edit
      @resource = Step.load_resource(controls, params, action_inquirer)
    end

    def update
      @resource = Step.load_resource(controls, params, action_inquirer)

      if @resource.update(permitted_params)
        redirect_to polymorphic_path(Super.configuration.path_parts(@resource))
      else
        render :edit, status: :bad_request
      end
    end

    def destroy
      @resource = Step.load_resource(controls, params, action_inquirer)

      if @resource.destroy
        redirect_to polymorphic_path(Super.configuration.path_parts(controls.model))
      else
        redirect_to polymorphic_path(Super.configuration.path_parts(@resource))
      end
    end

    private

    def controls
      Super::Controls.new(new_controls)
    end

    def permitted_params
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
