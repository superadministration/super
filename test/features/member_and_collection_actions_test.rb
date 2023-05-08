# typed: false

require "test_helper"

class MemberAndCollectionActionsTest
  class DefaultTest < ActionDispatch::IntegrationTest
    controller(Super::ApplicationController) do
      private

      def model
        Ship
      end
    end

    test "collection actions load" do
      get "/anonymous"
      assert_equal(200, response.status)
      assert_includes(response.body, "/anonymous/new")
    end

    test "member actions load" do
      get "/anonymous"
      assert_equal(200, response.status)
      assert_includes(response.body, "/anonymous/#{Ship.first.id}/edit")
    end
  end

  class OverriddenTest < ActionDispatch::IntegrationTest
    controller(Super::ApplicationController) do
      private

      def model
        Ship
      end

      def member_actions(record)
        super.push(Super::Partial.new("member_action_partial"))
      end

      def collection_actions
        super.push(Super::Partial.new("collection_action_partial"))
      end
    end

    views["_member_action_partial.html.erb"] = <<~HTML
      MEMBER_ACTION_PARTIAL
    HTML

    views["_collection_action_partial.html.erb"] = <<~HTML
      COLLECTION_ACTION_PARTIAL
    HTML

    test "collection actions load" do
      get "/anonymous"
      assert_equal(200, response.status)
      assert_includes(response.body, "COLLECTION_ACTION_PARTIAL")
    end

    test "member actions load" do
      get "/anonymous"
      assert_equal(200, response.status)
      assert_includes(response.body, "MEMBER_ACTION_PARTIAL")
    end
  end
end
