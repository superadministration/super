module Super
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
