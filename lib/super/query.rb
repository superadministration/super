# typed: strict
# frozen_string_literal: true

module Super
  class Query
    extend T::Sig

    sig { params(model: T.class_of(ActiveRecord::Base), params: ActiveSupport::HashWithIndifferentAccess, current_path: String).void }
    def initialize(model:, params:, current_path:)
      @model = model
      @params = params
      @path = current_path
      @addons = T.let({}, T::Hash[Symbol, Super::Query::FormObjectInterface])
      @backwards_addons = T.let({}, T::Hash[Super::Query::FormObjectInterface, Symbol])
    end

    sig { returns(T::Hash[Symbol, Super::Query::FormObjectInterface]) }
    attr_reader :addons
    sig { returns(T.class_of(ActiveRecord::Base)) }
    attr_reader :model
    sig { returns(ActiveSupport::HashWithIndifferentAccess) }
    attr_reader :params
    sig { returns(String) }
    attr_reader :path
    sig { returns(T::Hash[Super::Query::FormObjectInterface, Symbol]) }
    attr_reader :backwards_addons

    private :model
    private :params
    private :backwards_addons

    sig { params(klass: T.untyped, namespace: Symbol, additional_initialization_arguments: T.untyped).returns(Super::Query::FormObjectInterface) }
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

    sig { params(query_form_object: Super::Query::FormObjectInterface).returns(Symbol) }
    def namespace_for(query_form_object)
      backwards_addons.fetch(query_form_object)
    end

    sig { returns(T::Hash[Symbol, T.untyped]) }
    def form_options
      {
        url: path,
        method: :get
      }
    end

    sig { params(relation: ActiveRecord::Relation).returns(ActiveRecord::Relation) }
    def apply_changes(relation)
      records = T.let(relation, ActiveRecord::Relation)

      addons.each_value do |addon|
        records = addon.apply_changes(records)
      end

      records
    end

    sig { returns(String) }
    def to_partial_path
      "query"
    end
  end
end
