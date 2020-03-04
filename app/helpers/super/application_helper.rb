module Super
  module ApplicationHelper
    def super_resolve_list_for_rendering(partials, block = -> {})
      block_result = block.call
      if block_result.present?
        partials = [block_result, *partials]
      end

      partials = partials.map do |partial|
        if partial.is_a?(Symbol)
          instance_variable_get(partial)
        else
          partial
        end
      end

      partials.compact
    end

    def super_render_partialish(partialish)
      if partialish.respond_to?(:to_partial_path)
        if partialish.is_a?(Super::Partial)
          render(partialish, partialish.locals)
        else
          render(partialish)
        end
      else
        partialish
      end
    end
  end
end
