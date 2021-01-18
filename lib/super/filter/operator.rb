# frozen_string_literal: true

module Super
  class Filter
    module Operator
      class Definition
        def initialize(identifier, name, filter)
          @identifier = identifier
          @name = name
          @filter = filter
        end

        attr_reader :identifier
        attr_reader :name

        def filter(*args)
          @filter.call(args)
        end
      end

      class << self
        def registry
          @registry ||= {}
        end

        def range_defaults
          [
            registry["between"],
          ]
        end

        def select_defaults
          [
            registry["eq"],
            registry["neq"],
          ]
        end

        def text_defaults
          [
            registry["eq"],
            registry["neq"],
            registry["contain"],
            registry["ncontain"],
            registry["start"],
            registry["end"],
          ]
        end

        def define(identifier, name, &filter)
          identifier = identifier.to_s
          name = name.to_s

          definition = Definition.new(identifier, name, filter)

          registry[identifier] = definition

          define_singleton_method(identifier) do
            registry[identifier]
          end
        end
      end

      define("eq", "equals") do |relation, field, query|
        relation.where(field => query)
      end

      define("neq", "doesn't equal") do |relation, field, query|
        relation.where.not(field => query)
      end

      define("contain", "contains") do |relation, field, query|
        query = "%#{Compatability.sanitize_sql_like(query)}%"
        relation.where("#{field} LIKE ?", "%#{query}%")
      end

      define("ncontain", "doesn't contain") do |relation, field, query|
        query = "%#{Compatability.sanitize_sql_like(query)}%"
        relation.where("#{field} NOT LIKE ?", query)
      end

      define("start", "starts with") do |relation, field, query|
        query = "#{Compatability.sanitize_sql_like(query)}%"
        relation.where("#{field} LIKE ?", query)
      end

      define("end", "ends with") do |relation, field, query|
        query = "%#{Compatability.sanitize_sql_like(query)}"
        relation.where("#{field} LIKE ?", query)
      end

      define("between", "between") do |relation, field, query0, query1|
        if query0.present?
          relation = relation.where("#{field} >= ?", query0)
        end

        if query1.present?
          relation = relation.where("#{field} <= ?", query1)
        end

        relation
      end
    end
  end
end
