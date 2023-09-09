# typed: true
# frozen_string_literal: true

module Super
  # Provides a default implementation for each of the resourceful actions
  class ApplicationController < ViewController
    include ClientError::Handling

    before_action do
      T.bind(self, Super::ApplicationController)
      if !Super::PackagedAsset.version_matches_gem?
        flash.now[:mismatching_package_json_gemfile_versions] = I18n.t("super.mismatching_package_json_gemfile_versions")
      end
    end

    # Displays a list of records to the user
    #
    # @return [void]
    def index
      if request.format.ref == :csv && !csv_enabled?
        params_for_rebuilding_url = params.to_unsafe_hash
        params_for_rebuilding_url.delete("format")
        return redirect_to params_for_rebuilding_url
      end

      @records = load_records
      @display = display_schema.apply(action: current_action, format: request.format, is_unpoly: unpoly?)
      @view = index_view
      initialize_filter_form
      initialize_sort_form
      @records = apply_queries
    end

    # Displays a specific record to the user
    #
    # @return [void]
    def show
      @record = load_record
      @display = display_schema.apply(action: current_action, format: request.format, is_unpoly: unpoly?)
      @view = show_view
    end

    # Displays a form to allow the user to create a new record
    #
    # @return [void]
    def new
      @record = build_record
      @form = form_schema
      @view = new_view
    end

    # Creates a record, or shows the validation errors
    #
    # @return [void]
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
    #
    # @return [void]
    def edit
      @record = load_record
      @form = form_schema
      @view = edit_view
    end

    # Updates a record, or shows validation errors
    #
    # @return [void]
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
    #
    # @return [void]
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

    # @return [void]
    def redirect_to_record
      redirect_to polymorphic_path(Super::Link.polymorphic_parts(@record))
    end

    # @return [void]
    def redirect_to_records
      redirect_to polymorphic_path(Super::Link.polymorphic_parts(model))
    end

    # @return [void]
    def redirect_to_record_with_destroy_failure_message(error = nil)
      flash.alert =
        case error
        when ActiveRecord::InvalidForeignKey
          I18n.t("super.destroy_error.invalid_foreign_key")
        else
          I18n.t("super.destroy_error.generic")
        end

      redirect_to polymorphic_path(Super::Link.polymorphic_parts(@record))
    end

    # @return [void]
    def render_new_as_bad_request
      @current_action = ActionInquirer.new!
      @form = form_schema
      @view = new_view
      render :new, status: :bad_request
    end

    # @return [void]
    def render_edit_as_bad_request
      @current_action = ActionInquirer.edit!
      @form = form_schema
      @view = edit_view
      render :edit, status: :bad_request
    end
  end
end
