# frozen_string_literal: true

module Super
  class Filter
    # This schema type is used to configure the filtering form on your +#index+
    # action.
    #
    # The +operators:+ keyword argument can be left out in each case. There is
    # a default set of operators that are provided.
    #
    # Note: The constants under "Defined Under Namespace" are considered
    # private.
    #
    #   class MemberDashboard
    #     # ...
    #
    #     def filter_schema
    #       Super::Filter.new do |fields, type|
    #         fields[:name] = type.text(operators: [
    #           Super::Filter::Operator.eq,
    #           Super::Filter::Operator.contain,
    #           Super::Filter::Operator.ncontain,
    #           Super::Filter::Operator.start,
    #           Super::Filter::Operator.end,
    #         ])
    #         fields[:rank] = type.select(collection: Member.ranks.values)
    #         fields[:position] = type.text(operators: [
    #           Super::Filter::Operator.eq,
    #           Super::Filter::Operator.neq,
    #           Super::Filter::Operator.contain,
    #           Super::Filter::Operator.ncontain,
    #         ])
    #         fields[:ship_id] = type.select(
    #           collection: Ship.all.map { |s| ["#{s.name} (Ship ##{s.id})", s.id] },
    #         )
    #         fields[:created_at] = type.timestamp
    #         fields[:updated_at] = type.timestamp
    #       end
    #     end
    #
    #     # ...
    #   end
    class SchemaTypes
      class Text
        def initialize(partial_path:, operators:)
          @partial_path = partial_path
          @operators = operators
        end

        attr_reader :operators

        def to_partial_path
          @partial_path
        end

        def q
          [:q]
        end
      end

      class Select
        def initialize(collection:, operators:)
          @collection = collection
          @operators = operators
        end

        attr_reader :collection
        attr_reader :operators

        def to_partial_path
          "filter_type_select"
        end

        def q
          [:q]
        end
      end

      class Timestamp
        def initialize(operators:)
          @operators = operators
        end

        attr_reader :operators

        def to_partial_path
          "filter_type_timestamp"
        end

        def q
          [:q0, :q1]
        end
      end

      def select(collection:, operators: Filter::Operator.select_defaults)
        Select.new(
          collection: collection,
          operators: operators
        )
      end

      def text(operators: Filter::Operator.text_defaults)
        Text.new(
          partial_path: "filter_type_text",
          operators: operators
        )
      end

      def timestamp(operators: Filter::Operator.range_defaults)
        Timestamp.new(operators: operators)
      end
    end
  end
end
