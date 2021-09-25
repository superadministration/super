require "test_helper"

class NavigationTest < ActiveSupport::TestCase
  teardown do
    Rails.application.reload_routes!
  end

  def test_returning_one_non_array
    navbar = Super::Navigation.new do |nav|
      nav.link_to("Boats", "/admin/boats")
    end

    assert_equal([Super::Link.new("Boats", "/admin/boats")], navbar.definition)
  end

  def test_builder_link_to
    navbar = Super::Navigation.new do |nav|
      nav.link_to("Members", "/admin/members")
    end

    assert_equal([Super::Link.new("Members", "/admin/members")], navbar.definition)
  end

  def test_builder_link_with_model
    navbar = Super::Navigation.new do |nav|
      nav.link(Member)
    end

    assert_equal([Super::Link.new("Members", "/admin/members")], navbar.definition)
  end

  def test_builder_menu_with_args
    navbar = Super::Navigation.new do |nav|
      nav.menu("Members", nav.link(Member))
    end

    assert_equal(
      [Super::Navigation::Menu.new("Members", [Super::Link.new("Members", "/admin/members")])],
      navbar.definition
    )
  end

  def test_builder_menu_with_proc_args
    navbar = Super::Navigation.new do |nav|
      nav.menu("Members")[nav.link(Member)]
    end

    assert_equal(
      [Super::Navigation::Menu.new("Members", [Super::Link.new("Members", "/admin/members")])],
      navbar.definition
    )
  end

  def test_builder_menu_with_both_args
    navbar = Super::Navigation.new do |nav|
      nav.menu("Members", nav.link(Member))[nav.link(FavoriteThing)]
    end

    assert_equal(
      [
        Super::Navigation::Menu.new(
          "Members",
          [
            Super::Link.new("Members", "/admin/members"),
            Super::Link.new("Favorite things", "/admin/favorite_things"),
          ]
        )
      ],
      navbar.definition
    )
  end

  def test_builder_with_nested_menus
    navbar = Super::Navigation.new do |nav|
      nav.menu(
        "Members",
        nav.menu("Only", nav.link(Member))
      )
    end

    assert_raises(Super::Error::ArgumentError, /nested/) do
      navbar.definition
    end

    navbar = Super::Navigation.new do |nav|
      nav.menu(
        "Members",
        nav.menu("Only")[nav.link(Member)]
      )
    end

    assert_raises(Super::Error::ArgumentError, /nested/) do
      navbar.definition
    end

    navbar = Super::Navigation.new do |nav|
      nav.menu("Members")[nav.menu("Only")[nav.link(Member)]]
    end

    assert_raises(Super::Error::ArgumentError, /nested/) do
      navbar.definition
    end

    navbar = Super::Navigation.new do |nav|
      nav.menu("Members")[nav.menu("Only", nav.link(Member))]
    end

    assert_raises(Super::Error::ArgumentError, /nested/) do
      navbar.definition
    end
  end

  def test_builder_with_only_rest
    Rails.application.routes.draw do
      namespace :admin do
        resources :boats
        resources :marshmallows do
          resources :bacons
        end
      end
      namespace :admin do
        mount(-> {}, at: "/sidekiq", via: :all)
      end
    end

    navbar = Super::Navigation.new do |nav|
      [nav.rest]
    end

    assert_equal(
      [
        Super::Link.new("Boats", "/admin/boats"),
        Super::Link.new("Marshmallows", "/admin/marshmallows"),
        Super::Link.new("Sidekiq", "/admin/sidekiq"),
      ],
      navbar.definition
    )
  end

  def test_builder_with_two_rests
    Rails.application.routes.draw do
      namespace :admin do
        resources :boats
        resources :marshmallows do
          resources :bacons
        end
      end
      namespace :admin do
        mount(-> {}, at: "/sidekiq", via: :all)
      end
    end

    navbar = Super::Navigation.new do |nav|
      [
        nav.rest,
        nav.menu("Everything, again", nav.rest),
      ]
    end

    assert_equal(
      [
        Super::Link.new("Boats", "/admin/boats"),
        Super::Link.new("Marshmallows", "/admin/marshmallows"),
        Super::Link.new("Sidekiq", "/admin/sidekiq"),
        Super::Navigation::Menu.new(
          "Everything, again",
          [
            Super::Link.new("Boats", "/admin/boats"),
            Super::Link.new("Marshmallows", "/admin/marshmallows"),
            Super::Link.new("Sidekiq", "/admin/sidekiq"),
          ]
        ),
      ],
      navbar.definition
    )
  end

  def test_builder_with_rest_before_any_explicit_ones
    Rails.application.routes.draw do
      namespace :admin do
        resources :boats
        resources :marshmallows do
          resources :bacons
        end
        mount(-> {}, at: "/sidekiq", via: :all)
      end
    end

    navbar = Super::Navigation.new do |nav|
      [
        nav.rest,
        nav.link_to("Boats", "/admin/boats"),
      ]
    end

    assert_equal(
      [
        Super::Link.new("Marshmallows", "/admin/marshmallows"),
        Super::Link.new("Sidekiq", "/admin/sidekiq"),
        Super::Link.new("Boats", "/admin/boats"),
      ],
      navbar.definition
    )
  end

  def test_builder_all
    Rails.application.routes.draw do
      namespace :admin do
        resources :boats
        resources :marshmallows do
          resources :bacons
        end
        mount(-> {}, at: "/sidekiq", via: :all)
      end
    end

    navbar = Super::Navigation.new do |nav|
      [
        nav.link_to("Moats", "/admin/boats"),
        nav.all,
        nav.rest,
      ]
    end

    assert_equal(
      [
        Super::Link.new("Moats", "/admin/boats"),
        Super::Link.new("Boats", "/admin/boats"),
        Super::Link.new("Marshmallows", "/admin/marshmallows"),
        Super::Link.new("Sidekiq", "/admin/sidekiq"),
        Super::Link.new("Marshmallows", "/admin/marshmallows"),
        Super::Link.new("Sidekiq", "/admin/sidekiq"),
      ],
      navbar.definition
    )
  end
end

class NavigationCapybaraTest < CapybaraTest
  selenium!

  test "it opens and closes" do
    visit admin_members_path
    assert_no_selector("a", text: "Favorite things")
    find("summary", text: "Other").click
    assert_selector("a", text: "Favorite things")
    find("summary", text: "Other").click
    assert_no_selector("a", text: "Favorite things")
  end
end
