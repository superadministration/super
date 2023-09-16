# frozen_string_literal: true

module Super
  class FormBuilder
    class Wrappers
      def select(attribute, choices, options = {}, html_options = {}, &block)
        options, defaults = split_defaults(options, include_blank: true)
        options = defaults.merge(options)
        html_options, html_defaults = split_defaults(html_options, class: "super-input super-input-select")
        html_options[:class] = join_classes(html_defaults[:class], html_options[:class])

        @builder.select(attribute, choices, options, html_options, &block)
      end

      define_convenience :select

      def collection_select(attribute, collection, value_method, text_method, options = {}, html_options = {})
        options, defaults = split_defaults(options, include_blank: true)
        options = defaults.merge(options)
        html_options, html_defaults = split_defaults(html_options, class: "super-input super-input-select")
        html_options[:class] = join_classes(html_defaults[:class], html_options[:class])

        @builder.collection_select(attribute, collection, value_method, text_method, options, html_options)
      end

      define_convenience :collection_select

      def grouped_collection_select(attribute, collection, group_method, group_label_method, option_key_method, option_value_method, options = {}, html_options = {})
        options, defaults = split_defaults(options, include_blank: true)
        options = defaults.merge(options)
        html_options, html_defaults = split_defaults(html_options, class: "super-input super-input-select")
        html_options[:class] = join_classes(html_defaults[:class], html_options[:class])

        @builder.grouped_collection_select(attribute, collection, group_method, group_label_method, option_key_method, option_value_method, options, html_options)
      end

      define_convenience :grouped_collection_select

      def time_zone_select(attribute, priority_zones = nil, options = {}, html_options = {})
        options, defaults = split_defaults(options, include_blank: true)
        options = defaults.merge(options)
        html_options, html_defaults = split_defaults(html_options, class: "super-input super-input-select")
        html_options[:class] = join_classes(html_defaults[:class], html_options[:class])

        @builder.time_zone_select(attribute, priority_zones, options, html_options)
      end

      define_convenience :time_zone_select, priority_zones: "nil"

      def collection_check_boxes(attribute, collection, value_method, text_method, options = {}, html_options = {}, &block)
        options, defaults = split_defaults(options, include_blank: true)
        options = defaults.merge(options)
        html_options, html_defaults = split_defaults(html_options, class: "")
        html_options[:class] = join_classes(html_defaults[:class], html_options[:class])

        @builder.collection_check_boxes(attribute, collection, value_method, text_method, options, html_options, &block)
      end

      define_convenience :collection_check_boxes

      def collection_radio_buttons(attribute, collection, value_method, text_method, options = {}, html_options = {}, &block)
        options, defaults = split_defaults(options, include_blank: true)
        options = defaults.merge(options)
        html_options, html_defaults = split_defaults(html_options, class: "")
        html_options[:class] = join_classes(html_defaults[:class], html_options[:class])

        @builder.collection_radio_buttons(attribute, collection, value_method, text_method, options, html_options, &block)
      end

      define_convenience :collection_radio_buttons
    end
  end
end
