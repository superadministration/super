# frozen_string_literal: true

module Super
  class Form
    class Builder
      class Wrappers
        def rich_text_area(attribute, options = {})
          options, defaults = split_defaults(options, class: "trix-content super-input w-full")
          options[:class] = join_classes(defaults[:class], options[:class])

          @builder.rich_text_area(attribute, options)
        end

        define_convenience :rich_text_area
      end
    end
  end
end
