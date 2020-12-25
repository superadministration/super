module Super
  class Controls
    # Methods for `Controls` that have a sane default implementation
    module Optional
      # This is an optional method
      #
      # @return [String]
      def title
        default_for(:title) do
          model.name.pluralize
        end
      end

      # Configures what database records are visible on load. This is an optional
      # method, it defaults to "`all`" methods
      #
      # @param action [ActionInquirer]
      # @return [ActiveRecord::Relation]
      def scope(action:)
        default_for(:scope, action: action) do
          model.all
        end
      end

      # Configures the fields that are displayed on the index and show actions.
      # This is a required method
      #
      # @param action [ActionInquirer]
      # @return [Schema]
      def display_schema(action:)
        default_for(:display_schema, action: action) do
          Display.new(action: action) do |fields, type|
            Display::Guesser.new(model: model, action: action, fields: fields, type: type).call
          end
        end
      end

      # Configures the editable fields on the new and edit actions. This is a
      # required method
      #
      # @param action [ActionInquirer]
      # @return [Schema]
      def form_schema(action:)
        default_for(:form_schema, action: action) do
          Form.new do |fields, type|
            Form::Guesser.new(model: model, fields: fields, type: type).call
          end
        end
      end

      # Configures which parameters could be written to the database. This is a
      # required method
      #
      # @param params [ActionController::Parameters]
      # @param action [ActionInquirer]
      # @return [ActionController::Parameters]
      def permitted_params(params, action:)
        default_for(:permitted_params, params, action: action) do
          strong_params = Super::Form::StrongParams.new(form_schema(action: action))
          params.require(strong_params.require(model)).permit(strong_params.permit)
        end
      end

      # Configures the actions linked to on the index page. This is an optional
      # method
      #
      # @param action [ActionInquirer]
      # @return [Array<Link>]
      def collection_actions(action:)
        default_for(:collection_actions, action: action) do
          Super::Link.find_all(:new)
        end
      end

      # Configures the actions linked to on the show page as well as each row of
      # the table on the index page. This is an optional method
      #
      # @param action [ActionInquirer]
      # @return [Array<Link>]
      def member_actions(action:)
        default_for(:member_actions, action: action) do
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
end
