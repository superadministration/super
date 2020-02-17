module Super
  class Action
    def initialize(steps:, page:)
      @steps = steps
      @page = page
    end

    attr_reader :page

    def steps
      resolved_steps = @steps.map do |step|
        if step.respond_to?(:call)
          step
        elsif self.class.steps.key?(step)
          self.class.steps[step]
        end
      end

      resolved_steps.compact
    end
  end
end
