# frozen_string_literal: true

module Super
  module Reset
    extend ActiveSupport::Concern

    included do
      undef_method :index
      undef_method :show
      undef_method :new
      undef_method :create
      undef_method :edit
      undef_method :update
      undef_method :destroy
    end
  end
end
