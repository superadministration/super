# frozen_string_literal: true

module Super
  module Useful
    module Builder
      def builder(method_name)
        alias_method("original_#{method_name}", method_name)

        define_method(method_name) do |*args|
          send("original_#{method_name}", *args)
          self
        end
      end

      def builder_with_block(method_name)
        alias_method("original_#{method_name}", method_name)

        define_method(method_name) do |*args, &block|
          send("original_#{method_name}", *args, &block)
          self
        end
      end
    end
  end
end
