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

      # Specifies how many records to show per page
      #
      # @param action [ActionInquirer]
      # @param query_params [Hash]
      # @return [ActiveRecord::Relation]
      def records_per_page(action:, query_params:)
        default_for(:records_per_page, action: action, query_params: query_params) do
          Super.configuration.index_records_per_page
        end
      end
    end
  end
end
