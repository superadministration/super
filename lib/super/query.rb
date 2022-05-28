# frozen_string_literal: true

module Super
  class Query
    def initialize(model:, params:, current_path:)
      @model = model
      @params = params
      @path = current_path
      @addons = {}
      @backwards_addons = {}
    end

    attr_reader :addons
    attr_reader :model
    attr_reader :params
    attr_reader :path
    attr_reader :backwards_addons

    private :model
    private :params
    private :backwards_addons

    def build(klass, namespace:, **additional_initialization_arguments)
      params_for_querier =
        params.fetch(namespace) { ActiveSupport::HashWithIndifferentAccess.new }

      instance = klass.new(
        model: model,
        params: params_for_querier,
        **additional_initialization_arguments
      )

      addons[namespace] = instance
      backwards_addons[instance] = namespace
      instance
    end

    def namespace_for(query_form_object)
      backwards_addons.fetch(query_form_object)
    end

    def form_options
      {
        url: path,
        method: :get
      }
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
  end
end
