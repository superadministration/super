# typed: strict
# frozen_string_literal: true

module Super
  module Sort
    class FormObject
      extend T::Sig

      include Query::FormObjectInterface

      DIRECTIONS = T.let(["asc", "desc"], T::Array[String])

      sig do
        params(
          model: T.class_of(ActiveRecord::Base),
          params: ActiveSupport::HashWithIndifferentAccess,
          default: T::Hash[T.any(String, Symbol), T.any(String, Symbol)],
          sortable_columns: T::Array[T.any(String, Symbol)]
        ).void
      end
      def initialize(model:, params:, default:, sortable_columns:)
        @model = model
        @params = params
        @default = default
        @sortable_columns = T.let(sortable_columns.map(&:to_s), T::Array[String])
      end

      sig { returns(T::Array[String]) }
      attr_reader :sortable_columns

      sig { override.returns(String) }
      def to_partial_path
        "sort"
      end

      sig { returns(T::Array[Super::Sort::FormObject::Expression]) }
      def exprs
        sanitized_expr_params.map { |ordering| T.unsafe(Expression).new(**ordering) }
      end

      sig { returns(Super::Sort::FormObject::Expression) }
      def new_expr
        Expression.new(a: nil, d: :desc)
      end

      class Expression
        extend T::Sig

        sig { returns(T.nilable(String)) }
        attr_accessor :a # attribute
        sig { returns(String) }
        attr_accessor :d # direction

        sig { params(a: T.nilable(String), d: T.nilable(T.any(String, Symbol))).void }
        def initialize(a:, d:)
          @a = T.let(a, T.nilable(String))
          @d = T.let(d.to_s, String)
          @index = T.let(nil, T.nilable(T.any(Integer, String)))
        end

        sig { params(index: T.any(Integer, String)).returns(Super::Sort::FormObject::Expression) }
        def with_index(index)
          @index = index
          self
        end

        # This is for `fields_for` to work
        sig { returns(T.any(Integer, String)) }
        def id
          T.must(@index)
        end

        sig { returns(T::Boolean) }
        def persisted?
          false
        end
      end

      sig { returns(T::Boolean) }
      def persisted?
        false
      end

      sig { override.params(relation: ActiveRecord::Relation).returns(ActiveRecord::Relation) }
      def apply_changes(relation)
        query = T.let(relation, ActiveRecord::Relation)

        exprs.each do |expr|
          query = query.order(expr.a => expr.d)
        end

        query
      end

      private

      # Stringifies the values
      sig { returns(T::Array[T::Hash[Symbol, String]]) }
      def sanitized_expr_params
        seen = {}
        normalized_expr_params
          .map do |p|
            {
              a: p[:a].presence&.to_s&.strip,
              d: p[:d].presence&.to_s&.strip
            }
          end
          .select { |p| p[:a].present? && DIRECTIONS.include?(p[:d]) }
          .select { |p| @sortable_columns.include?(p[:a]) }
          .select do |p|
            next false if seen.key?(p[:a])

            seen[p[:a]] = true
            true
          end
      end

      # Symbolizes the keys
      sig { returns(T::Array[T::Hash[Symbol, Symbol]]) }
      def normalized_expr_params
        from_params = @params[:exprs]

        return default_as_query if from_params.nil?

        if from_params.is_a?(Array)
          return from_params.map(&:to_h).map(&:symbolize_keys)
        end

        from_params.to_h.values.map(&:symbolize_keys)
      end

      sig { returns(T::Array[T::Hash[Symbol, Symbol]]) }
      def default_as_query
        @default.map do |attribute_name, direction|
          {
            a: attribute_name,
            d: direction
          }
        end
      end
    end
  end
end
