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
      @super_action = controls.index
      @super_action.steps.each do |step|
        instance_exec(&step)
      end
    end

    def show
      @super_action = controls.show
      @super_action.steps.each do |step|
        instance_exec(&step)
      end
    end

    def new
      @super_action = controls.new
      @super_action.steps.each do |step|
        instance_exec(&step)
      end
    end

    def create
      @super_action = controls.create
      @super_action.steps.each do |step|
        instance_exec(&step)
      end

      if @resource.save
        redirect_to polymorphic_path(Super.configuration.path_parts(@resource))
      else
        render :new, status: :bad_request
      end
    end

    def edit
      @super_action = controls.edit
      @super_action.steps.each do |step|
        instance_exec(&step)
      end
    end

    def update
      @super_action = controls.update
      @super_action.steps.each do |step|
        instance_exec(&step)
      end

      if @resource.update(update_permitted_params)
        redirect_to polymorphic_path(Super.configuration.path_parts(@resource))
      else
        render :edit, status: :bad_request
      end
    end

    def destroy
      @super_action = controls.destroy
      @super_action.steps.each do |step|
        instance_exec(&step)
      end

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
