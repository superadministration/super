# frozen_string_literal: true

module Super
  class Partial
    def initialize(path, locals: {})
      @to_partial_path = path
      @locals = locals
    end

    attr_reader :to_partial_path
    attr_reader :locals
  end
end
