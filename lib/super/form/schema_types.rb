module Super
  class Form
    # This schema type is used on your +#edit+ and +#new+ forms
    #
    # Note: The constants under "Defined Under Namespace" are considered
    # private.
    #
    #   class MemberDashboard
    #     # ...
    #
    #     def new_schema
    #       Super::Schema.new(Super::Form::SchemaTypes.new) do |fields, type|
    #         fields[:name] = type.generic("write_type_text")
    #         fields[:rank] = type.generic("write_type_select", collection: Member.ranks.keys)
    #         fields[:position] = type.generic("write_type_text")
    #         fields[:ship_id] = type.generic(
    #           "write_type_select",
    #           collection: Ship.all.map { |s| ["#{s.name} (Ship ##{s.id})", s.id] },
    #         )
    #       end
    #     end
    #
    #     # ...
    #   end
    class SchemaTypes
      class Generic
        def initialize(partial_path:, extras:)
          @partial_path = partial_path
          @extras = extras
        end

        def to_partial_path
          @partial_path
        end

        def [](key)
          @extras[key]
        end
      end

      def generic(partial_path, extras = nil)
        extras ||= {}
        Generic.new(partial_path: partial_path, extras: extras)
      end
    end
  end
end
