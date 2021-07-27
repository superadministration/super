require "test_helper"

class ApplicationResetTest < ActionDispatch::IntegrationTest
  controller(Super::ApplicationController) do
    include Super::Reset
  end

  views["index.html.erb"] = <<~HTML
    <h1>Hi</h1>
  HTML

  def test_it_loads
    get "/anonymous"
    assert_select "title", Super.configuration.title
    assert_select "h1", "Hi"
  end
end
