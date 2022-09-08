# typed: strict
# frozen_string_literal: true

module Super::Query::FormObjectInterface
  extend T::Sig
  extend T::Helpers
  interface!

  sig { abstract.params(relation: ActiveRecord::Relation).returns(ActiveRecord::Relation) }
  def apply_changes(relation)
  end

  sig { abstract.returns(String) }
  def to_partial_path
  end
end
