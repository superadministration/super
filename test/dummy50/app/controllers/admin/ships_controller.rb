module Admin
  class ShipsController < AdminController
    private

    def dashboard
      ShipDashboard.new
    end
  end
end
