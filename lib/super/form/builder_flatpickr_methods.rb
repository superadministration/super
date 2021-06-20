# frozen_string_literal: true

module Super
  class Form
    class Builder
      class Wrappers
        def date_flatpickr(attribute, options = {})
          options, defaults = split_defaults(
            options,
            class: "super-input w-full",
            data: {
              controller: "flatpickr",
              flatpickr_options_value: {
                dateFormat: "Y-m-d",
              }
            }
          )
          options[:class] = join_classes(defaults[:class], options[:class])
          options[:data] = defaults[:data].deep_merge(options[:data] || {})
          options[:value] = @builder.object.public_send(attribute).presence
          options[:value] = options[:value].iso8601 if options[:value].respond_to?(:iso8601)

          @builder.text_field(attribute, options)
        end

        def date_flatpickr!(attribute, label_text: nil, label: {}, field: {}, show_errors: true)
          container do
            compact_join([
              public_send(:label, attribute, label_text, label),
              %(<div class="mt-1">).html_safe,
              public_send(:date_flatpickr, attribute, field),
              show_errors && inline_errors(attribute),
              %(</div>).html_safe,
            ])
          end
        end

        def datetime_flatpickr(attribute, options = {})
          options, defaults = split_defaults(
            options,
            class: "super-input w-full",
            data: {
              controller: "flatpickr",
              flatpickr_options_value: {
                enableSeconds: true,
                enableTime: true,
                dateFormat: "Z",
              }
            }
          )
          options[:class] = join_classes(defaults[:class], options[:class])
          options[:data] = defaults[:data].deep_merge(options[:data] || {})
          options[:value] = @builder.object.public_send(attribute).presence
          options[:value] = options[:value].iso8601 if options[:value].respond_to?(:iso8601)

          @builder.text_field(attribute, options)
        end

        def datetime_flatpickr!(attribute, label_text: nil, label: {}, field: {}, show_errors: true)
          container do
            compact_join([
              public_send(:label, attribute, label_text, label),
              %(<div class="mt-1">).html_safe,
              public_send(:datetime_flatpickr, attribute, field),
              show_errors && inline_errors(attribute),
              %(</div>).html_safe,
            ])
          end
        end

        def time_flatpickr(attribute, options = {})
          options, defaults = split_defaults(
            options,
            class: "super-input w-full",
            data: {
              controller: "flatpickr",
              flatpickr_options_value: {
                enableSeconds: true,
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i:S",
              }
            }
          )
          options[:class] = join_classes(defaults[:class], options[:class])
          options[:data] = defaults[:data].deep_merge(options[:data] || {})
          options[:value] = @builder.object.public_send(attribute).presence
          options[:value] = options[:value].strftime("%H:%M:%S") if options[:value].respond_to?(:strftime)

          @builder.text_field(attribute, options)
        end

        def time_flatpickr!(attribute, label_text: nil, label: {}, field: {}, show_errors: true)
          container do
            compact_join([
              public_send(:label, attribute, label_text, label),
              %(<div class="mt-1">).html_safe,
              public_send(:time_flatpickr, attribute, field),
              show_errors && inline_errors(attribute),
              %(</div>).html_safe,
            ])
          end
        end
      end
    end
  end
end
