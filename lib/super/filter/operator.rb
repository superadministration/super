# frozen_string_literal: true

module Super
  class Filter
    class Operator
      class << self
        def registry
          @registry ||= {}
        end

        def [](key)
          registry.fetch(key.to_s)
        end

        def register(identifier, operator)
          identifier = identifier.to_s
          if registry.key?(identifier)
            raise Error::AlreadyRegistered, "Already registered: #{identifier}"
          end

          registry[identifier] = operator
        end

        def define(identifier, display, &block)
          operator = new(identifier, display, &block).freeze
          register(identifier, operator)
          operator
        end
      end

      def initialize(identifier, display, &behavior)
        @identifier = identifier.to_s
        @humanized_operator_name = display
        self.behavior = behavior
      end

      def behavior=(behavior)
        behavior_params = behavior.parameters
        if behavior_params.size < 2
          raise Error::ArgumentError, "Operator behavior must include `column_name` and `relation`"
        end
        if behavior_params[0][0] != :req && behavior_params[0][0] != :opt
          raise Error::ArgumentError, "First argument `relation` must be a required, positional argument"
        end
        if behavior_params[1][0] != :req && behavior_params[1][0] != :opt
          raise Error::ArgumentError, "Second argument `column_name` must be a required, positional argument"
        end
        if !behavior_params[2..-1].all? { |(type, _name)| type == :keyreq }
          raise Error::ArgumentError, "All query parameter keys must be required, keyword arguments"
        end
        @behavior = behavior
        @query_parameter_keys = behavior_params[2..-1].map(&:last)
      end

      attr_reader :identifier
      attr_reader :query_parameter_keys
      attr_reader :humanized_operator_name

      def behavior(&block)
        self.behavior = block if block_given?
        @behavior
      end

      define("eq", "Equals") do |relation, field, q:|
        relation.where(field => q)
      end

      define("neq", "Doesn't equal") do |relation, field, q:|
        relation.where.not(field => q)
      end

      define("null", "Is NULL") do |relation, field|
        relation.where(field => nil)
      end

      define("nnull", "Isn't NULL") do |relation, field|
        relation.where.not(field => nil)
      end

      define("empty", "Is empty") do |relation, field|
        relation.where(field => "")
      end

      define("nempty", "Isn't empty") do |relation, field|
        relation.where.not(field => "")
      end

      define("blank", "Is blank") do |relation, field|
        relation.where(field => [nil, ""])
      end

      define("nblank", "Isn't blank") do |relation, field|
        relation.where.not(field => [nil, ""])
      end

      define("contain", "Contains") do |relation, field, q:|
        query = "%#{Compatability.sanitize_sql_like(q)}%"
        if relation.connection.adapter_name == "PostgreSQL"
          relation.where("#{field} ILIKE ?", query)
        else
          relation.where("#{field} LIKE ?", query)
        end
      end

      define("ncontain", "Doesn't contain") do |relation, field, q:|
        query = "%#{Compatability.sanitize_sql_like(q)}%"
        relation.where("#{field} NOT LIKE ?", query)
      end

      define("between", "Between") do |relation, field, q0:, q1:|
        if q0.present?
          relation = relation.where("#{field} >= ?", q0)
        end

        if q1.present?
          relation = relation.where("#{field} <= ?", q1)
        end

        relation
      end
    end
  end
end
