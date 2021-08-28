require "test_helper"

class Super::DisplayTest < ActionView::TestCase
  def test_index_with_computed
    index_action = Super::ActionInquirer.index!
    view.define_singleton_method(:current_action) { index_action }
    view.define_singleton_method(:model) { Member }
    view.define_singleton_method(:resolved_member_actions) { |*| [] }

    display = Super::Display.new do |f, type|
      f[:just_a_test] = type.computed(:record) { |record| record.name.upcase }
      f[:just_a_link] = type.computed(:record) { |record| Super::Link.new(record.rank, "https://rubyonrails.org/") }
    end
    display.apply(action: view.current_action, format: Mime[:html])

    @records = [members(:picard)]
    render(display)

    assert_select "tbody td", "JEAN-LUC PICARD"
    links = css_select("tbody td a")
    assert_equal(1, links.size)
    link = links.first
    assert_equal("captain", link.text)
    assert_equal("https://rubyonrails.org/", link["href"])
  end

  def test_show_default
    show_action = Super::ActionInquirer.show!
    view.define_singleton_method(:current_action) { show_action }
    view.define_singleton_method(:model) { Member }
    view.define_singleton_method(:resolved_member_actions) { |*| [] }
    view.define_singleton_method(:display_schema) do
      Display.new do |fields, type|
        Display::Guesser.new(model: Member, action: show_action, fields: fields, type: type).call
      end
    end

    display = view.display_schema
    display.apply(action: view.current_action, format: Mime[:html])

    @record = members(:picard)
    render(display)

    assert_select "table td", @record.id.to_s
    assert_select "table td", "Jean-Luc Picard"
  end

  def test_enums
    index_action = Super::ActionInquirer.index!
    view.define_singleton_method(:current_action) { index_action }
    view.define_singleton_method(:model) { Member }
    view.define_singleton_method(:resolved_member_actions) { |*| [] }

    display = Super::Display.new do |f, type|
      f[:testing_badges] =
        type.badge(:computed, :record)
        .format_for_display { |record| record.rank }
        .format_for_display { |record| record.name }
        .when("captain") { [:blue] }
        .else { [:red] }
    end
    display.apply(action: view.current_action, format: Mime[:html])

    @records = [members(:picard)]
    render(display)
    span = document_root_element.at_css("span")
    assert_equal("Jean-Luc Picard", span.text)
    assert_includes(span.attr("class"), "bg-red-")
    assert_includes(span.attr("class"), "text-white")
  end

  private

  def new_action(action)
    Super::ActionInquirer.new(Super::ActionInquirer.default_for_resources, action)
  end
end
