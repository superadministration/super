# typed: true

class AdminController < Super::ApplicationController
  private

  def site_navigation
    Super::Navigation.new do |nav|
      nav.link(Member)
      nav.link(Ship)
      nav.menu("Other") do
        nav.rest
      end
    end
  end
end
