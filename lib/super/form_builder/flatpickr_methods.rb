# typed: true
# frozen_string_literal: true

module Super
  class FormBuilder
    class Wrappers
      def date_flatpickr(attribute, options = {})
        options, defaults = split_defaults(
          options,
          class: "up-flatpickr super-input w-full",
          data: {
            up_flatpickr_options: {
              dateFormat: "Y-m-d"
            }
          }
        )
        options[:class] = join_classes(defaults[:class], options[:class])
        options[:data] = defaults[:data].deep_merge(options[:data] || {})
        options[:value] = @builder.object.public_send(attribute).presence
        options[:value] = options[:value].iso8601 if options[:value].respond_to?(:iso8601)

        @builder.text_field(attribute, options)
      end

      define_convenience :date_flatpickr

      def datetime_flatpickr(attribute, options = {})
        options, defaults = split_defaults(
          options,
          class: "up-flatpickr super-input w-full",
          data: {
            up_flatpickr_options: {
              enableSeconds: true,
              enableTime: true,
              dateFormat: "Z"
            }
          }
        )
        options[:class] = join_classes(defaults[:class], options[:class])
        options[:data] = defaults[:data].deep_merge(options[:data] || {})
        options[:value] = @builder.object.public_send(attribute).presence
        options[:value] = options[:value].iso8601 if options[:value].respond_to?(:iso8601)

        @builder.text_field(attribute, options)
      end

      define_convenience :datetime_flatpickr

      def time_flatpickr(attribute, options = {})
        options, defaults = split_defaults(
          options,
          class: "up-flatpickr super-input w-full",
          data: {
            up_flatpickr_options: {
              enableSeconds: true,
              enableTime: true,
              noCalendar: true,
              dateFormat: "H:i:S"
            }
          }
        )
        options[:class] = join_classes(defaults[:class], options[:class])
        options[:data] = defaults[:data].deep_merge(options[:data] || {})
        options[:value] = @builder.object.public_send(attribute).presence
        options[:value] = options[:value].strftime("%H:%M:%S") if options[:value].respond_to?(:strftime)

        @builder.text_field(attribute, options)
      end

      define_convenience :time_flatpickr
    end
  end
end
