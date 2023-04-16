# frozen_string_literal: true

module Super
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
  class FormBuilder < ActionView::Helpers::FormBuilder
    FIELD_ERROR_PROC = proc { |html_tag, instance| html_tag }
    FORM_BUILDER_DEFAULTS = {builder: self}.freeze

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
          messages = Form::InlineErrors.error_messages(@builder.object, attribute).map do |msg|
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

      private_class_method def self.define_with_label_tag(method_name, **optionals)
        parameters = instance_method(method_name).parameters
        definition = []
        call = []
        definition_last = ["label_text: nil", "label: {}", "show_errors: true"]
        call_last = []
        parameters.each do |type, name|
          if name == :options && type == :opt
            definition.push("field: {}")
            call.push("field")
          elsif name == :html_options && type == :opt
            definition.push("field_html: {}")
            call.push("field_html")
          elsif type == :block
            definition_last.push("&#{name}")
            call_last.push("&#{name}")
          elsif type == :req
            definition.push(name.to_s)
            call.push(name.to_s)
          elsif type == :opt || type == :key
            if !optionals.key?(name)
              raise Super::Error::ArgumentError, "Form bang method has optional argument, but doesn't know the default value: #{name}"
            end

            default_value = optionals[name]

            if type == :opt
              definition.push("#{name} = #{default_value}")
              call.push(name.to_s)
            elsif type == :key
              definition.push("#{name}: #{default_value}")
              call.push("#{name}: #{name}")
            else
              raise Super::Error::ArgumentError, "Form bang method has a unprocessable argument with name #{name}"
            end
          else
            raise Super::Error::ArgumentError, "Form bang method has keyword argument type #{type} and name #{name}"
          end
        end

        definition += definition_last
        call += call_last

        class_eval(<<~RUBY, __FILE__, __LINE__ + 1)
          def #{method_name}!(#{definition.join(", ")})
            container do
              compact_join([
                public_send(:label, attribute, label_text, label),
                %(<div class="mt-1">).html_safe,
                #{method_name}(#{call.join(", ")}),
                show_errors && inline_errors(attribute),
                %(</div>).html_safe,
              ])
            end
          end
        RUBY
      end

      private_class_method def self.define_convenience(method_name, *args, **kwargs)
        define_with_label_tag(method_name, *args, **kwargs)
        ::Super::Form::SchemaTypes.define_schema_type_for(method_name)
      end

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
