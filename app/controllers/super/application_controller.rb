# frozen_string_literal: true

module Super
  # Provides a default implementation for each of the resourceful actions
  class ApplicationController < ActionController::Base
    include ClientError::Handling

    helper_method :current_action
    helper_method :controls
    helper_method :navigation

    # Displays a list of records to the user
    def index
      @records = controls.load_records(action: current_action, params: params)
      @display = controls.display_schema(action: current_action).apply(action: current_action)
      @view = controls.index_view
      @query_form = controls.initialize_query_form(params: params, current_path: request.path)
      controls.initialize_filter_form(query_form: @query_form)
      controls.initialize_sort_form(query_form: @query_form)
      @records = controls.apply_queries(query_form: @query_form, records: @records)
    end

    # Displays a specific record to the user
    def show
      @record = controls.load_record(action: current_action, params: params)
      @display = controls.display_schema(action: current_action).apply(action: current_action)
      @view = controls.show_view
    end

    # Displays a form to allow the user to create a new record
    def new
      @record = controls.build_record(action: current_action)
      @form = controls.form_schema(action: current_action)
      @view = controls.new_view
    end

    # Creates a record, or shows the validation errors
    def create
      @record = controls.build_record_with_params(action: current_action, params: params)

      if controls.save_record(action: current_action, record: @record, params: params)
        redirect_to polymorphic_path(Super::Link.polymorphic_parts(@record))
      else
        @current_action = ActionInquirer.new!
        @form = controls.form_schema(action: current_action)
        @view = controls.new_view
        render :new, status: :bad_request
      end
    end

    # Displays a form to allow the user to update an existing record
    def edit
      @record = controls.load_record(action: current_action, params: params)
      @form = controls.form_schema(action: current_action)
      @view = controls.edit_view
    end

    # Updates a record, or shows validation errors
    def update
      @record = controls.load_record(action: current_action, params: params)

      if controls.update_record(action: current_action, record: @record, params: params)
        redirect_to polymorphic_path(Super::Link.polymorphic_parts(@record))
      else
        @current_action = ActionInquirer.edit!
        @form = controls.form_schema(action: current_action)
        @view = controls.edit_view
        render :edit, status: :bad_request
      end
    end

    # Deletes a record, or shows validation errors
    def destroy
      @record = controls.load_record(action: current_action, params: params)

      if controls.destroy_record(action: current_action, record: @record, params: params)
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

    def controls
      @controls ||= new_controls
    end

    def current_action
      @current_action ||=
        ActionInquirer.new(
          ActionInquirer.default_for_resources,
          params[:action]
        )
    end

    def navigation
      Navigation.new(&:all)
    end
  end
end
