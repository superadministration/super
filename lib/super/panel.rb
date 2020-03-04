module Super
  class Panel
    def initialize(*parts)
      if block_given?
        @parts = Array.new(yield)
      end

      @parts = parts
    end

    attr_reader :parts

    def to_partial_path
      "super_panel"
    end
  end
end
