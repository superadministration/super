# typed: strict

class Super::Cluster
  extend T::Sig

  NameType = T.type_alias { T.any(String, Symbol) }
  ValueType = T.type_alias { T.proc.params(arg0: ActiveRecord::Relation).returns(T.nilable(ActiveRecord::Relation)) }

  sig { params(block: T.proc.params(arg0: Super::Cluster).void).void }
  def initialize(&block)
    @options = T.let({}, T::Hash[String, ValueType])
    yield self
  end

  sig { params(name: NameType, block: ValueType).void }
  def option(name, &block)
    @options[name.to_s] = block
  end

  sig { params(name: T.nilable(NameType)).returns(T.nilable(ValueType)) }
  def option_get(name)
    name = option_name_normalize(name)
    return nil if name.nil?
    @options[name]
  end

  sig { params(name: T.nilable(NameType)).returns(T.nilable(String)) }
  def option_name_normalize(name)
    name = name&.to_s
    return nil if !enabled?
    return T.must(@options.first).first if name.nil?
    return name if @options.key?(name)

    T.must(@options.first).first
  end

  sig { returns(T::Boolean) }
  def enabled?
    !@options.empty?
  end

  class FormObject
    extend T::Sig
    include Super::Query::FormObjectInterface

    sig do
      params(model: T.class_of(ActiveRecord::Base), params: T::Hash[String, T.untyped], schema: Super::Cluster).void
    end
    def initialize(model:, params:, schema:)
      @params = params
      @schema = schema
      @option_id = T.let(@params["id"], T.nilable(NameType))
    end

    sig { returns(T.nilable(String)) }
    def id
      @schema.option_name_normalize(@option_id)
    end

    sig { override.params(relation: ActiveRecord::Relation).returns(ActiveRecord::Relation) }
    def apply_changes(relation)
      group = @schema.option_get(@option_id)
      group&.call(relation) || relation
    end

    sig { override.returns(String) }
    def to_partial_path
      "group"
    end
  end
end
