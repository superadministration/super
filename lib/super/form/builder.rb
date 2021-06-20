# frozen_string_literal: true

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

        def container(&block)
          @template.content_tag(:div, class: "super-field-group", &block)
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
