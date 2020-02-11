module Super
  # A wrapper around the per-controller Controls classes. This class often
  # directly delegates to the per-controller classes, but it can also provide
  # some default implementation.
  class Controls
    def initialize(actual)
      @actual = actual
    end

    attr_reader :actual

    # This is an optional method
    #
    # @return [String]
    def title
      if @actual.respond_to?(:title)
        return @actual.title
      end

      model.name.pluralize
    end

    # Specifies the model. This is a required method
    #
    # @return [ActiveRecord::Base]
    def model
      @actual.model
    end

    # Configures the actions linked to on the index page. This is an optional
    # method
    #
    # @param params [ActionController::Parameters]
    # @param action [ActionInquirer]
    # @return [Array<Link>]
    def resources_actions(params:, action:)
      actions =
        if @actual.respond_to?(:resources_actions)
          @actual.resources_actions(params: params, action: action)
        else
          [:new]
        end

      actions.map do |link|
        link = Link.resolve(link)

        link.call(params: params)
      end
    end

    # Configures the actions linked to on the show page as well as each row of
    # the table on the index page. This is an optional method
    #
    # @param resource [ActiveRecord::Base]
    # @param params [ActionController::Parameters]
    # @param action [ActionInquirer]
    # @return [Array<Link>]
    def resource_actions(resource, params:, action:)
      actions =
        if @actual.respond_to?(:resource_actions)
          @actual.resource_actions(resource, params: params, action: action)
        else
          if action.show?
            [:edit, :destroy]
          else
            [:show, :edit, :destroy]
          end
        end

      actions.map do |link|
        link = Link.resolve(link)

        link.call(resource, params: params)
      end
    end

    # Configures what database records are visible on load. This is an optional
    # method, it defaults to "`all`" methods
    #
    # @param action [ActionInquirer]
    # @return [ActiveRecord::Relation]
    def scope(action:)
      if @actual.respond_to?(:scope)
        return @actual.scope(action: action)
      end

      model.all
    end

    # Configures which parameters could be written to the database. This is a
    # required method
    #
    # @param params [ActionController::Parameters]
    # @param action [ActionInquirer]
    # @return [ActionController::Parameters]
    def permitted_params(params, action:)
      @actual.permitted_params(params, action: action)
    end

    # Configures the fields that are displayed on the index and show actions.
    # This is a required method
    #
    # @param action [ActionInquirer]
    # @return [Schema]
    def display_schema(action:)
      @actual.display_schema(action: action)
    end

    # Configures the editable fields on the new and edit actions. This is a
    # required method
    #
    # @param action [ActionInquirer]
    # @return [Schema]
    def form_schema(action:)
      @actual.form_schema(action: action)
    end
  end
end
