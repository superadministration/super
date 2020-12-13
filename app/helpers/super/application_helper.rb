module Super
  # View helpers, available within views
  module ApplicationHelper
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
