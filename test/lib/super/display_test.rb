# typed: false

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
      Super::Display.new do |fields, type|
        Super::Display::Guesser.new(model: Member, action: show_action, fields: fields, type: type).call
      end
    end

    display = view.display_schema
    display.apply(action: view.current_action, format: Mime[:html])

    @record = members(:picard)
    render(display)

    assert_select "table td", @record.id.to_s
    assert_select "table td", "Jean-Luc Picard"
  end

  def test_real_value
    show_action = Super::ActionInquirer.show!
    view.define_singleton_method(:current_action) { show_action }
    view.define_singleton_method(:model) { Member }
    view.define_singleton_method(:resolved_member_actions) { |*| [] }
    view.define_singleton_method(:display_schema) do
      Super::Display.new do |f, type|
        f[:name] = type.real(:attribute) { |column| Super::Badge.new(column.upcase, style: :blue) }
        f[:rank] = type.real(:attribute) { |attribute| Super::Badge.new(attribute.tr("A-Za-z", "N-ZA-Mn-za-m"), style: :red) }
      end
    end

    display = view.display_schema
    display.apply(action: view.current_action, format: Mime[:html])

    @record = members(:picard)
    render(display)

    assert_select "table td", "JEAN-LUC PICARD"
    assert_select "table td", "pncgnva"
  end

  def test_enums
    index_action = Super::ActionInquirer.index!
    view.define_singleton_method(:current_action) { index_action }
    view.define_singleton_method(:model) { Member }
    view.define_singleton_method(:resolved_member_actions) { |*| [] }

    display = Super::Display.new do |f, type|
      f[:testing_badges] = type.computed(:record) do |record|
        if record.rank == "captain"
          Super::Badge.new(record.name, style: :red)
        else
          Super::Badge.new(record.name, style: :blue)
        end
      end
    end
    display.apply(action: view.current_action, format: Mime[:html])

    @records = [members(:picard)]
    render(display)
    span = document_root_element.at_css("span")
    assert_equal("Jean-Luc Picard", span.text)
    assert_includes(span.attr("class"), "bg-red-")
    assert_includes(span.attr("class"), "text-white")
  end

  test "overriding attribute name on #index" do
    index_action = Super::ActionInquirer.index!
    view.define_singleton_method(:current_action) { index_action }
    view.define_singleton_method(:model) { Member }
    view.define_singleton_method(:resolved_member_actions) { |*| [] }

    display = Super::Display.new do |f, type|
      f[:name] = type.string.attribute_name("Designation")
    end
    display.apply(action: view.current_action, format: Mime[:html])

    @records = [members(:picard)]
    render(display)

    assert_select "thead th", "Designation"
    assert_select "tbody td", "Jean-Luc Picard"
  end

  test "overriding attribute name on #show" do
    show_action = Super::ActionInquirer.show!
    view.define_singleton_method(:current_action) { show_action }
    view.define_singleton_method(:model) { Member }
    view.define_singleton_method(:resolved_member_actions) { |*| [] }

    display = Super::Display.new do |f, type|
      f[:name] = type.string.attribute_name("Designation")
    end
    display.apply(action: view.current_action, format: Mime[:html])

    @record = members(:picard)
    render(display)

    assert_select "th", "Designation"
    assert_select "td", "Jean-Luc Picard"
  end

  private

  def new_action(action)
    Super::ActionInquirer.new(Super::ActionInquirer.default_for_resources, action)
  end
end
