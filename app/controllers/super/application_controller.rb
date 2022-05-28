# frozen_string_literal: true

module Super
  # Provides a default implementation for each of the resourceful actions
  class ApplicationController < SubstructureController
    include ClientError::Handling

    before_action do
      if Super::PackagedAsset.warning_message
        flash.now[:mismatching_package_json_gemfile_versions] = Super::PackagedAsset.warning_message
      end
    end

    # Displays a list of records to the user
    def index
      if request.format.ref == :csv && !csv_enabled?
        params_for_rebuilding_url = params.to_unsafe_hash
        params_for_rebuilding_url.delete("format")
        return redirect_to params_for_rebuilding_url
      end

      @records = load_records
      @display = display_schema.apply(action: current_action, format: request.format)
      @view = index_view
      initialize_filter_form
      initialize_sort_form
      @records = apply_queries
    end

    # Displays a specific record to the user
    def show
      @record = load_record
      @display = display_schema.apply(action: current_action, format: request.format)
      @view = show_view
    end

    # Displays a form to allow the user to create a new record
    def new
      @record = build_record
      @form = form_schema
      @view = new_view
    end

    # Creates a record, or shows the validation errors
    def create
      @record = build_record
      set_record_attributes

      if save_record
        redirect_to_record
      else
        render_new_as_bad_request
      end
    end

    # Displays a form to allow the user to update an existing record
    def edit
      @record = load_record
      @form = form_schema
      @view = edit_view
    end

    # Updates a record, or shows validation errors
    def update
      @record = load_record
      set_record_attributes

      if save_record
        redirect_to_record
      else
        render_edit_as_bad_request
      end
    end

    # Deletes a record, or shows validation errors
    def destroy
      @record = load_record

      if destroy_record
        redirect_to_records
      else
        redirect_to_record_with_destroy_failure_message
      end
    rescue ActiveRecord::ActiveRecordError => e
      redirect_to_record_with_destroy_failure_message(e)
    end

    private

    helper_method def current_action
      @current_action ||=
        ActionInquirer.new(
          ActionInquirer.default_for_resources,
          params[:action]
        )
    end

    def with_current_action(action)
      original = @current_action
      @current_action = ActionInquirer.new(
        ActionInquirer.default_for_resources,
        action
      )
      yield
    ensure
      @current_action = original
    end

    helper_method def resolved_member_actions(record)
      member_actions(record).map do |action|
        if action.respond_to?(:resolve)
          resolve_member_action(action, record)
        else
          action
        end
      end
    end

    helper_method def resolved_collection_actions
      collection_actions.map do |action|
        if action.respond_to?(:resolve)
          resolve_collection_action(action)
        else
          action
        end
      end
    end
  end
end
