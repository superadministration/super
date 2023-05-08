# typed: strict

require "test_helper"

class LinkBuilderTest < ActiveSupport::TestCase
  test "it resolves even when it's already resolved" do
    builder =
      Super::LinkBuilder.new
        .text { |**| "Text" }
        .href { |**| "/href" }
        .options { |**| {class: "hi"} }

    link = builder.resolve
    assert_equal("Text", link.text)
    assert_equal("/href", link.href)
    assert_equal({class: "hi"}, link.options)
  end

  test "it lets all fields be resolvable" do
    builder =
      Super::LinkBuilder.new
        .text { |text:, **| text }
        .href { |params:, **| {controller: params[:controller], action: "new", only_path: true} }
        .options { |params:, **| {class: params[:class]} }

    link = builder.resolve(params: {controller: "admin/members", class: "hi"}, text: "Text")
    assert_equal("Text", link.text)
    assert_equal("/admin/members/new", link.href)
    assert_equal({class: "hi"}, link.options)
  end

  test "it requires that text is set" do
    builder =
      Super::LinkBuilder.new
        .href { |**| "/href" }
        .options { |**| {class: "hi"} }

    assert_raises(Super::Error::IncompleteBuilder) do
      builder.resolve
    end
  end

  test "it requires that href is set" do
    builder =
      Super::LinkBuilder.new
        .text { |**| "Text" }
        .options { |**| {class: "hi"} }

    assert_raises(Super::Error::IncompleteBuilder) do
      builder.resolve
    end
  end

  test "it doesn't require options to be set" do
    builder =
      Super::LinkBuilder.new
        .text { |**| "Text" }
        .href { |**| "/href" }

    builder.resolve
  end
end
