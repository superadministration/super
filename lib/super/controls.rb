module Super
  class Controls
    def initialize(dashboard)
      @dashboard = dashboard
    end

    attr_reader :dashboard

    def method_missing(method_name, *args)
      if @dashboard.respond_to?(method_name)
        @dashboard.public_send(method_name, *args)
      else
        super
      end
    end

    def respond_to_missing?(method_name, _ = false)
      if @dashboard.respond_to?(method_name)
        true
      else
        super
      end
    end
  end
end
