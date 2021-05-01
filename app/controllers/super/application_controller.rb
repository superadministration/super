# frozen_string_literal: true

module Super
  # Provides a default implementation for each of the resourceful actions
  class ApplicationController < SubstructureController
    include ClientError::Handling

    helper_method :current_action

    # Displays a list of records to the user
    def index
      @records = load_records
      @display = display_schema.apply(action: current_action)
      @view = index_view
      @query_form = initialize_query_form
      initialize_filter_form
      initialize_sort_form
      @records = apply_queries
    end

    # Displays a specific record to the user
    def show
      @record = load_record
      @display = display_schema.apply(action: current_action)
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
      @record = build_record_with_params

      if save_record
        redirect_to polymorphic_path(Super::Link.polymorphic_parts(@record))
      else
        @current_action = ActionInquirer.new!
        @form = form_schema
        @view = new_view
        render :new, status: :bad_request
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

      if update_record
        redirect_to polymorphic_path(Super::Link.polymorphic_parts(@record))
      else
        @current_action = ActionInquirer.edit!
        @form = form_schema
        @view = edit_view
        render :edit, status: :bad_request
      end
    end

    # Deletes a record, or shows validation errors
    def destroy
      @record = load_record

      if destroy_record
        redirect_to polymorphic_path(Super::Link.polymorphic_parts(@record))
      else
        flash.alert = "Couldn't delete record"
        redirect_to polymorphic_path(Super::Link.polymorphic_parts(@record))
      end
    rescue ActiveRecord::InvalidForeignKey => e
      flash.alert = "Couldn't delete record: #{e.class}"
      redirect_to polymorphic_path(Super::Link.polymorphic_parts(@record))
    end

    private

    def current_action
      @current_action ||=
        ActionInquirer.new(
          ActionInquirer.default_for_resources,
          params[:action]
        )
    end
  end
end
