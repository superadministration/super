module Super
  class Schema
    # This schema type is meant to be used for +#index+ or +#show+ actions to
    # transform database fields into something that is human friendly.
    #
    # Note: The constants under "Defined Under Namespace" are considered
    # private.
    #
    #   class MemberDashboard
    #     # ...
    #
    #     def show_schema
    #       Super::Schema.new(Super::Schema::ReadTypes.new) do |fields, type|
    #         fields[:name] = type.dynamic { |name| name }
    #         fields[:rank] = type.dynamic { |rank| rank }
    #         fields[:position] = type.dynamic { |position| position }
    #         fields[:ship] = type.dynamic { |ship| "#{ship.name} (Ship ##{ship.id})" }
    #         fields[:created_at] = type.dynamic { |created_at| created_at.iso8601 }
    #         fields[:updated_at] = type.dynamic { |updated_at| updated_at.iso8601 }
    #       end
    #     end
    #
    #     # ...
    #   end
    class ReadTypes
      class Dynamic
        def initialize(transform_block)
          @transform_block = transform_block
        end

        def present(field)
          @transform_block.call(field)
        end
      end

      def dynamic(&transform_block)
        Dynamic.new(transform_block)
      end
    end
  end
end
