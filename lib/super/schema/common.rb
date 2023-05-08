# typed: true
# frozen_string_literal: true

module Super
  class Schema
    module Common
      def each_attribute_name
        if Kernel.block_given?
          @fields.keys.each do |key|
            yield(key)
          end
        end

        T.unsafe(self).enum_for(:each_attribute_name)
      end

      def each_attribute
        if Kernel.block_given?
          @fields.each do |key, value|
            yield(key, value)
          end
        end

        T.unsafe(self).enum_for(:each_attribute)
      end
    end
  end
end
