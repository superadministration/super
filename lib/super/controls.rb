module Super
  # A wrapper around the per-controller Controls classes. This class often
  # directly delegates to the per-controller classes, but it can also provide
  # some default implementation.
  class Controls
    def initialize(actual)
      @actual = actual
    end

    attr_reader :actual

    def title
      @actual.title
    end

    def model
      @actual.model
    end

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

    # @param action [ActionInquirer]
    def scope(action:)
      @actual.scope(action: action)
    end

    # @param params [ActionController::Parameters]
    # @param action [ActionInquirer]
    def permitted_params(params, action:)
      @actual.permitted_params(params, action: action)
    end

    # @param action [ActionInquirer]
    def display_schema(action:)
      @actual.display_schema(action: action)
    end

    # @param action [ActionInquirer]
    def form_schema(action:)
      @actual.form_schema(action: action)
    end
  end
end
