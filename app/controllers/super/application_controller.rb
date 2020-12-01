module Super
  # Provides a default implementation for each of the resourceful actions
  class ApplicationController < ActionController::Base
    include ClientError::Handling
    include Pluggable.new(:super_application_controller)

    helper_method :action_inquirer
    helper_method :controls

    def index
      @resources = controls.load_resources(action: action_inquirer, params: params)
      @pagination = controls.initialize_pagination(action: action_inquirer, resources: @resources, query_params: request.GET)
      @resources = controls.paginate_resources(action: action_inquirer, resources: @resources, pagination: @pagination)
      @display = controls.display_schema(action: action_inquirer)
    end

    def show
      @resource = controls.load_resource(action: action_inquirer, params: params)
      @display = controls.display_schema(action: action_inquirer)
    end

    def new
      @resource = controls.build_resource(action: action_inquirer)
      @form = controls.form_schema(action: action_inquirer)
    end

    def create
      @resource = controls.build_resource_with_params(action: action_inquirer, params: params)

      if controls.save_resource(action: action_inquirer, resource: @resource, params: params)
        redirect_to polymorphic_path(Super.configuration.path_parts(@resource))
      else
        @form = controls.form_schema(action: action_inquirer_for("new"))
        render :new, status: :bad_request
      end
    end

    def edit
      @resource = controls.load_resource(action: action_inquirer, params: params)
      @form = controls.form_schema(action: action_inquirer)
    end

    def update
      @resource = controls.load_resource(action: action_inquirer, params: params)

      if controls.update_resource(action: action_inquirer, resource: @resource, params: params)
        redirect_to polymorphic_path(Super.configuration.path_parts(@resource))
      else
        @form = controls.form_schema(action: action_inquirer_for("edit"))
        render :edit, status: :bad_request
      end
    end

    def destroy
      @resource = controls.load_resource(action: action_inquirer, params: params)

      if controls.destroy_resource(action: action_inquirer, resource: @resource, params: params)
        redirect_to polymorphic_path(Super.configuration.path_parts(controls.model))
      else
        redirect_to polymorphic_path(Super.configuration.path_parts(@resource))
      end
    end

    private

    def controls
      Super::Controls.new(new_controls)
    end

    def action_inquirer
      @action_inquirer ||= action_inquirer_for(params[:action])
    end

    def action_inquirer_for(action)
      ActionInquirer.new(
        ActionInquirer.default_resources,
        action
      )
    end
  end
end
