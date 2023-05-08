# typed: true
# frozen_string_literal: true

module Super
  module Plugin
    class Registry
      class << self
        def controller
          @controller ||= Registry.new
        end
      end

      def initialize
        @registry = {}
        @ordering = Hash.new { |hash, key| hash[key] = [] }
      end

      def use(include: nil, prepend: nil)
        register(include: include, prepend: prepend, before: [], after: [])
      end

      def insert_before(*before, include: nil, prepend: nil)
        register(include: include, prepend: prepend, before: before, after: [])
      end

      def insert_after(*after, include: nil, prepend: nil)
        register(include: include, prepend: prepend, before: [], after: after)
      end

      def classes_ordered
        each_node = ->(&b) { @ordering.each_key(&b) }
        each_child = ->(cb, &b) { @ordering[cb].each(&b) }

        TSort.tsort(each_node, each_child)
      end

      def ordered
        classes_ordered.each do |class_name|
          yield class_name, @registry[class_name]
        end
      end

      private

      def register(include:, prepend:, before: [], after: [])
        raise Error::InvalidPluginArgument, "only one of :include or :prepend can be filled out" if include && prepend
        raise Error::InvalidPluginArgument, "at least one of :include or :prepend must be filled out" if include.nil? && prepend.nil?

        klass = include || prepend
        @registry[klass] = :include if include
        @registry[klass] = :prepend if prepend

        before.each do |b|
          @ordering[b].push(klass)
        end

        @ordering[klass].push(*after)

        nil
      end
    end
  end
end
