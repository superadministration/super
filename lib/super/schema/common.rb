# typed: true
# frozen_string_literal: true

module Super
  class Schema
    module Common
      include Kernel

      def each_attribute_name
        if block_given?
          @fields.keys.each do |key|
            yield(key)
          end
        end

        enum_for(:each_attribute_name)
      end

      def each_attribute
        if block_given?
          @fields.each do |key, value|
            yield(key, value)
          end
        end

        enum_for(:each_attribute)
      end
    end
  end
end
