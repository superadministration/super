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

        def rich_text_area!(attribute, label_text: nil, label: {}, field: {}, show_errors: true)
          container do
            compact_join([
              public_send(:label, attribute, label_text, label),
              %(<div class="mt-1">).html_safe,
              public_send(:rich_text_area, attribute, field),
              show_errors && inline_errors(attribute),
              %(</div>).html_safe,
            ])
          end
        end
      end
    end
  end
end
