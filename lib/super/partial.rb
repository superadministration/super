module Super
  class Partial
    def self.render(partialish, template:)
      if partialish.respond_to?(:to_partial_path)
        if partialish.respond_to?(:locals)
          template.render(partialish, partialish.locals)
        else
          template.render(partialish)
        end
      else
        partialish
      end
    end

    def initialize(path, locals: {})
      @to_partial_path = path
      @locals = locals
    end

    attr_reader :to_partial_path
    attr_reader :locals
  end
end
