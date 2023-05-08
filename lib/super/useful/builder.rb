# typed: true
# frozen_string_literal: true

module Super
  module Useful
    module Builder
      def builder(method_name)
        T.bind(self, Class)
        alias_method(:"original_#{method_name}", method_name)

        define_method(method_name) do |*args|
          T.unsafe(self).send("original_#{method_name}", *args)
          self
        end
      end

      def builder_with_block(method_name)
        T.bind(self, Class)
        alias_method(:"original_#{method_name}", method_name)

        define_method(method_name) do |*args, &block|
          T.unsafe(self).send("original_#{method_name}", *args, &block)
          self
        end
      end
    end
  end
end
