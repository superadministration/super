# frozen_string_literal: true

module Super
  class Controls
    # Methods for `Controls` that have a sane default implementation
    module Optional
      # This is an optional method
      #
      # @return [String]
      def title
        model.name.pluralize
      end

      # Configures what database records are visible on load. This is an optional
      # method, it defaults to "`all`" methods
      #
      # @param action [ActionInquirer]
      # @return [ActiveRecord::Relation]
      def scope(action:)
        model.all
      end

      # Configures the fields that are displayed on the index and show actions.
      # This is a required method
      #
      # @param action [ActionInquirer]
      # @return [Display]
      def display_schema(action:)
        Display.new(action: action) do |fields, type|
          Display::Guesser.new(model: model, action: action, fields: fields, type: type).call
        end
      end

      # Configures the editable fields on the new and edit actions. This is a
      # required method
      #
      # @param action [ActionInquirer]
      # @return [Form]
      def form_schema(action:)
        Form.new do |fields, type|
          Form::Guesser.new(model: model, fields: fields, type: type).call
        end
      end

      # Configures which parameters could be written to the database. This is a
      # required method
      #
      # @param params [ActionController::Parameters]
      # @param action [ActionInquirer]
      # @return [ActionController::Parameters]
      def permitted_params(params, action:)
        strong_params = Super::Form::StrongParams.new(form_schema(action: action))
        params.require(strong_params.require(model)).permit(strong_params.permit)
      end

      # Configures the actions linked to on the index page. This is an optional
      # method
      #
      # @param action [ActionInquirer]
      # @return [Array<Link>]
      def collection_actions(action:)
        Super::Link.find_all(:new)
      end

      # Configures the actions linked to on the show page as well as each row of
      # the table on the index page. This is an optional method
      #
      # @param action [ActionInquirer]
      # @return [Array<Link>]
      def member_actions(action:)
        if action.show?
          Super::Link.find_all(:edit, :destroy)
        elsif action.edit?
          Super::Link.find_all(:show, :destroy)
        else
          Super::Link.find_all(:show, :edit, :destroy)
        end
      end
    end
  end
end
