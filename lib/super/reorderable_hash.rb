# typed: true
# frozen_string_literal: true

module Super
  class ReorderableHash
    include TSort
    include Enumerable

    UNDEFINED = BasicObject.new

    def initialize(data = {})
      @data = data
      @ordering = {}
      keys = @data.keys
      dependencies = []
      keys.each do |key|
        @ordering[key] = dependencies.dup
        dependencies.push(key)
      end
    end

    def insert(key, value, before: UNDEFINED, after: UNDEFINED)
      if @ordering.key?(key) || @data.key?(key)
        raise Super::Error::ReorderableHash::DuplicateKey, "Duplicate key: #{key}"
      end
      @ordering[key] = []
      @data[key] = value

      order(key, before: before, after: after)

      nil
    end

    def order(key, before: UNDEFINED, after: UNDEFINED)
      if before != UNDEFINED
        if !@ordering.key?(before)
          raise KeyError, "Before key not found. Have: #{@data.keys} Requested: #{before}"
        end
        @ordering[before].push(key)
      end

      if after != UNDEFINED
        if !@ordering.key?(after)
          raise KeyError, "After key not found. Have: #{@data.keys} Requested: #{after}"
        end
        @ordering[key].push(after)
      end
    end

    def tsort_each_node(&block)
      @ordering.each_key(&block)
    end

    def tsort_each_child(node, &block)
      dependencies = @ordering.fetch(node) { [] }
      dependencies.each(&block)
    end

    def []=(key, where, value)
      insert(key, value, **where)
    end

    def keys
      tsort
    end

    def values
      keys.each_with_object([]) do |key, array|
        array.push(@data[key])
      end
    end

    def to_h
      keys.each_with_object({}) do |key, hash|
        hash[key] = @data[key]
      end
    end

    def each(&block)
      if !block
        return enum_for(:each)
      end

      tsort_each do |key|
        block.call(key, @data[key])
      end
    end
  end
end
