# typed: true
# frozen_string_literal: true

module Super
  class Schema
    class Guesser
      def initialize(model:, fields:, type:)
        @model = model
        @fields = fields
        @type = type
        @rejects = []
      end

      def limit
        @limit = yield
        self
      end

      def reject(&block)
        @rejects.push(block)
        self
      end

      def ignore_foreign_keys
        @rejects.push(->(attribute_name) { is_foreign_key[attribute_name] })
        self
      end

      def assign_type(&block)
        @assign_type = block
        self
      end

      def call
        result = sorted_attribute_names
        result = @rejects.reduce(result) do |intermediary_result, rejection_proc|
          intermediary_result.reject(&rejection_proc)
        end

        result = result.first(@limit) if @limit && @limit != Float::INFINITY

        result.each do |name|
          @fields[name] = @assign_type.call(name)
        end
      end

      private

      def sorted_attribute_names
        @model
          .attribute_names
          .sort_by { |name| sort_weight[name] }
      end

      def sort_weight
        @sort_weight ||= Hash.new do |hash, name|
          hash[name] =
            case name
            when "id" then 0
            when "title" then 1000
            when "name" then 1300
            when "created_at" then 9500
            when "updated_at" then 9750
            else
              2000 + hash.size
            end
        end
      end

      def is_foreign_key
        @is_foreign_key ||=
          @model
            .reflect_on_all_associations
            .select { |a| a.macro == :belongs_to }
            .map { |a| [a.foreign_key, true] }
            .to_h
      end
    end
  end
end
