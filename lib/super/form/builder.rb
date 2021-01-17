module Super
  class Form
    # Example
    #
    # ```ruby
    # super_form_for([:admin, @member]) do |f|
    #   # the long way
    #   f.super.label :name
    #   f.super.text_field :name
    #   f.super.inline_errors :name
    #
    #   # the short way (slightly different from the long way, for alignment)
    #   f.super.text_field! :position
    # end
    # ```
    #
    # Refer to the Rails docs:
    # https://api.rubyonrails.org/classes/ActionView/Helpers/FormBuilder.html
    class Builder < ActionView::Helpers::FormBuilder
      FIELD_ERROR_PROC = proc { |html_tag, instance| html_tag }
      FORM_BUILDER_DEFAULTS = { builder: self }.freeze

      def super(**options)
        @super_wrappers ||= Wrappers.new(self, @template)
      end

      class Wrappers
        def initialize(builder, template)
          @builder = builder
          @template = template
        end

        def inline_errors(attribute)
          if @builder.object
            messages = InlineErrors.error_messages(@builder.object, attribute).map do |msg|
              error_content_tag(msg)
            end

            @template.safe_join(messages)
          else
            error_content_tag(<<~MSG.html_safe)
              This form doesn't have an object, so something is probably wrong.
              Maybe <code>accepts_nested_attributes_for</code> isn't set up?
            MSG
          end
        end

        def label(attribute, text = nil, options = {}, &block)
          options, defaults = split_defaults(options, class: "block")
          options[:class] = join_classes(defaults[:class], options[:class])

          @builder.label(attribute, text, options, &block)
        end

        def check_box(attribute, options = {}, checked_value = "1", unchecked_value = "0")
          @builder.check_box(attribute, options, checked_value, unchecked_value)
        end

        def password_field(attribute, options = {})
          options, defaults = split_defaults(options, class: "super-input w-full")
          options[:class] = join_classes(defaults[:class], options[:class])

          @builder.password_field(attribute, options)
        end

        def rich_text_area(attribute, options = {})
          options, defaults = split_defaults(options, class: "trix-content super-input w-full")
          options[:class] = join_classes(defaults[:class], options[:class])

          @builder.rich_text_area(attribute, options)
        end

        def select(attribute, choices, options = {}, html_options = {}, &block)
          options, defaults = split_defaults(options, include_blank: true)
          options = defaults.merge(options)
          html_options, html_defaults = split_defaults(html_options, class: "super-input super-input-select-field")
          html_options[:class] = join_classes(html_defaults[:class], html_options[:class])

          parts = [
            %(<div class="super-input-select">).html_safe,
            @builder.select(attribute, choices, options, html_options, &block),
            <<~HTML.html_safe,
              <div class="super-input-select-icon text-blue-700">
                <span class="h-4 w-4">
            HTML
            @template.render("super/feather/chevron_down"),
            <<~HTML.html_safe,
                </span>
              </div>
            HTML
            %(</div>).html_safe,
          ]

          @template.safe_join(parts)
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

        def container(&block)
          @template.content_tag(:div, class: "super-field-group", &block)
        end

        def check_box!(attribute, checked_value = "1", unchecked_value = "0", label: {}, field: {}, show_errors: true)
          label[:super] ||= {}
          label[:super] = { class: "select-none ml-1" }.merge(label[:super])
          container do
            compact_join([
              "<div>".html_safe,
              public_send(:check_box, attribute, field, checked_value, unchecked_value),
              public_send(:label, attribute, nil, label),
              "</div>".html_safe,
              show_errors && inline_errors(attribute),
            ])
          end
        end

        def password_field!(attribute, label: {}, field: {}, show_errors: true)
          container do
            compact_join([
              public_send(:label, attribute, label),
              %(<div class="mt-1">).html_safe,
              public_send(:password_field, attribute, field),
              show_errors && inline_errors(attribute),
              %(</div>).html_safe,
            ])
          end
        end

        def rich_text_area!(attribute, label: {}, field: {}, show_errors: true)
          container do
            compact_join([
              public_send(:label, attribute, label),
              %(<div class="mt-1">).html_safe,
              public_send(:rich_text_area, attribute, field),
              show_errors && inline_errors(attribute),
              %(</div>).html_safe,
            ])
          end
        end

        def select!(attribute, collection, label: {}, field: {}, show_errors: true)
          container do
            compact_join([
              public_send(:label, attribute, label),
              %(<div class="mt-1">).html_safe,
              public_send(:select, attribute, collection, field),
              show_errors && inline_errors(attribute),
              %(</div>).html_safe,
            ])
          end
        end

        def text_field!(attribute, label: {}, field: {}, show_errors: true)
          container do
            compact_join([
              public_send(:label, attribute, label),
              %(<div class="mt-1">).html_safe,
              public_send(:text_field, attribute, field),
              show_errors && inline_errors(attribute),
              %(</div>).html_safe,
            ])
          end
        end

        private

        def split_defaults(options, **internal_defaults)
          defaults = options.delete(:super) || {}
          # prefer options set in `defaults`, since they are user overrides
          defaults = internal_defaults.merge(defaults)

          [options, defaults]
        end

        def join_classes(*class_lists)
          class_lists.flatten.map(&:presence).compact
        end

        def error_content_tag(content)
          @template.content_tag(:p, content, class: "text-red-400 text-xs italic pt-1")
        end

        def compact_join(*parts)
          @template.safe_join(
            parts.flatten.map(&:presence).compact
          )
        end
      end
    end
  end
end
