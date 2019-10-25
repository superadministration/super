module Admin
  class MembersController < AdminController
    private

    def dashboard
      MemberDashboard.new
    end
  end
end
