# frozen_string_literal: true

module Super
  class Form
    class Builder
      class Wrappers
        def select(attribute, choices, options = {}, html_options = {}, &block)
          options, defaults = split_defaults(options, include_blank: true)
          options = defaults.merge(options)
          html_options, html_defaults = split_defaults(html_options, class: "super-input super-input-select")
          html_options[:class] = join_classes(html_defaults[:class], html_options[:class])

          @builder.select(attribute, choices, options, html_options, &block)
        end

        combine_with_label :select
      end
    end
  end
end
