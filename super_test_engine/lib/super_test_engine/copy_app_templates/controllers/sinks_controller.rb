# frozen_string_literal: true

class Admin::SinksController < AdminController
  class Controls < AdminControls
    def model
      Sink
    end
  end
end
