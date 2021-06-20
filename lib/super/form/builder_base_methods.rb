# frozen_string_literal: true

module Super
  class Form
    class Builder
      class Wrappers
        def label(attribute, text = nil, options = {}, &block)
          options, defaults = split_defaults(options, class: "block")
          options[:class] = join_classes(defaults[:class], options[:class])

          @builder.label(attribute, text, options, &block)
        end

        def check_box(attribute, options = {}, checked_value = "1", unchecked_value = "0")
          @builder.check_box(attribute, options, checked_value, unchecked_value)
        end

        def check_box!(attribute, checked_value: "1", unchecked_value: "0", label_text: nil, label: {}, field: {}, show_errors: true)
          label[:super] ||= {}
          label[:super] = { class: "select-none ml-1" }.merge(label[:super])
          container do
            compact_join([
              "<div>".html_safe,
              public_send(:check_box, attribute, field, checked_value, unchecked_value),
              public_send(:label, attribute, label_text, label),
              "</div>".html_safe,
              show_errors && inline_errors(attribute),
            ])
          end
        end

        def password_field(attribute, options = {})
          options, defaults = split_defaults(options, class: "super-input w-full")
          options[:class] = join_classes(defaults[:class], options[:class])

          @builder.password_field(attribute, options)
        end

        def password_field!(attribute, label_text: nil, label: {}, field: {}, show_errors: true)
          container do
            compact_join([
              public_send(:label, attribute, label_text, label),
              %(<div class="mt-1">).html_safe,
              public_send(:password_field, attribute, field),
              show_errors && inline_errors(attribute),
              %(</div>).html_safe,
            ])
          end
        end

        def submit(value = nil, options = {})
          value, options = nil, value if value.is_a?(Hash)
          options, defaults = split_defaults(options, class: "super-button")
          options[:class] = join_classes(defaults[:class], options[:class])

          @builder.submit(value, options)
        end

        def text_field(attribute, options = {})
          options, defaults = split_defaults(options, class: "super-input w-full")
          options[:class] = join_classes(defaults[:class], options[:class])

          @builder.text_field(attribute, options)
        end

        def text_field!(attribute, label_text: nil, label: {}, field: {}, show_errors: true)
          container do
            compact_join([
              public_send(:label, attribute, label_text, label),
              %(<div class="mt-1">).html_safe,
              public_send(:text_field, attribute, field),
              show_errors && inline_errors(attribute),
              %(</div>).html_safe,
            ])
          end
        end
      end
    end
  end
end
