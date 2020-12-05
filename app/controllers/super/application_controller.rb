module Super
  # Provides a default implementation for each of the resourceful actions
  class ApplicationController < ActionController::Base
    include ClientError::Handling
    include Pluggable.new(:super_application_controller)

    helper_method :action_inquirer
    helper_method :controls

    def index
      @records = controls.load_records(action: action_inquirer, params: params)
      @pagination = controls.initialize_pagination(action: action_inquirer, records: @records, query_params: request.GET)
      @records = controls.paginate_records(action: action_inquirer, records: @records, pagination: @pagination)
      @display = controls.display_schema(action: action_inquirer)
    end

    def show
      @record = controls.load_record(action: action_inquirer, params: params)
      @display = controls.display_schema(action: action_inquirer)
    end

    def new
      @record = controls.build_record(action: action_inquirer)
      @form = controls.form_schema(action: action_inquirer)
    end

    def create
      @record = controls.build_record_with_params(action: action_inquirer, params: params)

      if controls.save_record(action: action_inquirer, record: @record, params: params)
        redirect_to polymorphic_path(Super.configuration.path_parts(@record))
      else
        @form = controls.form_schema(action: action_inquirer_for("new"))
        render :new, status: :bad_request
      end
    end

    def edit
      @record = controls.load_record(action: action_inquirer, params: params)
      @form = controls.form_schema(action: action_inquirer)
    end

    def update
      @record = controls.load_record(action: action_inquirer, params: params)

      if controls.update_record(action: action_inquirer, record: @record, params: params)
        redirect_to polymorphic_path(Super.configuration.path_parts(@record))
      else
        @form = controls.form_schema(action: action_inquirer_for("edit"))
        render :edit, status: :bad_request
      end
    end

    def destroy
      @record = controls.load_record(action: action_inquirer, params: params)

      if controls.destroy_record(action: action_inquirer, record: @record, params: params)
        redirect_to polymorphic_path(Super.configuration.path_parts(controls.model))
      else
        redirect_to polymorphic_path(Super.configuration.path_parts(@record))
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
        ActionInquirer.default_for_resources,
        action
      )
    end
  end
end
