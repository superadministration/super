# frozen_string_literal: true

module Super
  class Form
    class Builder
      class Wrappers
        skipped_field_helpers = [:label, :check_box, :radio_button, :fields_for, :fields, :hidden_field, :file_field]
        (ActionView::Helpers::FormBuilder.field_helpers - skipped_field_helpers).each do |builder_method_name|
          class_eval(<<~RUBY, __FILE__, __LINE__ + 1)
            def #{builder_method_name}(attribute, options = {})
              options, defaults = split_defaults(options, class: "super-input w-full")
              options[:class] = join_classes(defaults[:class], options[:class])

              @builder.#{builder_method_name}(attribute, options)
            end

            def #{builder_method_name}!(attribute, label_text: nil, label: {}, field: {}, show_errors: true)
              container do
                compact_join([
                  public_send(:label, attribute, label_text, label),
                  %(<div class="mt-1">).html_safe,
                  public_send(:#{builder_method_name}, attribute, field),
                  show_errors && inline_errors(attribute),
                  %(</div>).html_safe,
                ])
              end
            end
          RUBY
        end

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

        def submit(value = nil, options = {})
          value, options = nil, value if value.is_a?(Hash)
          options, defaults = split_defaults(options, class: "super-button")
          options[:class] = join_classes(defaults[:class], options[:class])

          @builder.submit(value, options)
        end
      end
    end
  end
end
