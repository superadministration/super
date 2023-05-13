# typed: false

require "test_helper"

class ScopeTest < ActiveSupport::TestCase
  test "it scopes" do
    scope_schema = Super::Scope.new do |builder|
      builder(:all, &:all)
      builder(:obrien) { |scope| scope.where(rank: :nco).where("name LIKE '%Brien'") }
    end

    query = Super::Query.new(
      model: Member,
      params: ActionController::Parameters.new,
      current_path: "/foo"
    )

    query.build
  end
end
