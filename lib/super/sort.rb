# frozen_string_literal: true

module Super
  module Sort
    class FormObject
      DIRECTIONS = ["asc", "desc"]

      def initialize(model:, params:, default:, sortable_columns:)
        @model = model
        @params = params.dup
        @default = default
        @sortable_columns = sortable_columns.map(&:to_s)

        @params.permit!
      end

      attr_reader :sortable_columns

      def to_partial_path
        "sort"
      end

      def exprs
        sanitized_expr_params.map { |ordering| Expression.new(**ordering) }
      end

      def new_expr
        Expression.new(a: nil, d: :desc)
      end

      class Expression
        attr_accessor :a # attribute
        attr_accessor :d # direction

        def initialize(a:, d:)
          @a = a
          @d = d.to_s
        end

        def with_index(index)
          @index = index
          self
        end

        # This is for `fields_for` to work
        def id
          @index
        end

        def persisted?
          false
        end
      end

      def persisted?
        false
      end

      def apply_changes(query)
        exprs.each do |expr|
          query = query.order(expr.a => expr.d)
        end

        query
      end

      private

      # Stringifies the values
      def sanitized_expr_params
        seen = {}
        normalized_expr_params
          .each do |p|
            p[:a] = p[:a].presence&.to_s&.strip
            p[:d] = p[:d].presence&.to_s&.strip
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
      def normalized_expr_params
        from_params = @params[:exprs]

        return default_as_query if from_params.nil?

        if from_params.is_a?(Array)
          return from_params.map(&:to_h).map(&:symbolize_keys)
        end

        from_params.to_h.values.map(&:symbolize_keys)
      end

      def default_as_query
        @default.map do |attribute_name, direction|
          {
            a: attribute_name,
            d: direction,
          }
        end
      end
    end
  end
end
