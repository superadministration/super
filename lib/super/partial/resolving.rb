module Super
  class Partial
    module Resolving
      module_function

      def resolve_for_rendering(template, partials, block)
        if block
          partials = [block.call, *parts]
        end

        partials =
          partials.map do |partial|
            if partial.is_a?(Symbol)
              template.instance_variable_get(partial)
            else
              partial
            end
          end

        partials.compact
      end
    end
  end
end
