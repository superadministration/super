module Admin
  class UsersController < AdminController
    private

    def controls
      UserControls.new
    end
  end
end
