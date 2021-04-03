class AdminController < Super::ApplicationController
  class AdminControls < Super::Controls
  end

  private

  def new_controls
    self.class::Controls.new
  end
end
