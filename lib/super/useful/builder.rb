# frozen_string_literal: true

module Super
  module Useful
    module Builder
      def builder(method_name)
        alias_method("original_#{method_name}", method_name)

        define_method(method_name) do
          send("original_#{method_name}")
          self
        end
      end

      def builder_with_block(method_name)
        alias_method("original_#{method_name}", method_name)

        define_method(method_name) do |&block|
          send("original_#{method_name}", &block)
          self
        end
      end
    end
  end
end
