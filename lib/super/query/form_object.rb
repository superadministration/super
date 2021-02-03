# frozen_string_literal: true

module Super
  class Query
    class FormObject
      def initialize(model:, params:, namespace:, current_path:)
        @model = model
        @all_params = params.dup
        @namespace = namespace
        @params = params[namespace] || ActionController::Parameters.new
        @path = current_path
        @addons = {}
      end

      attr_reader :namespace
      attr_reader :path
      attr_reader :addons

      def add(klass, namespace:, **additional_initialization_arguments)
        instance = klass.new(
          model: @model,
          params: params_dig(namespace),
          **additional_initialization_arguments
        )

        addons[namespace] = instance
      end

      def apply_changes(records)
        addons.each_value do |addon|
          records = addon.apply_changes(records)
        end

        records
      end

      def to_partial_path
        "query"
      end

      private

      def params_dig(*keys)
        @params.dig(*keys) || ActionController::Parameters.new
      end
    end
  end
end
