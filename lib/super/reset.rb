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

      Super::SubstructureController.private_instance_methods(false).each do |imethod|
        next if imethod == :_layout
        next if imethod == :_generate_paths_by_default
        next if imethod == :navigation
        next if imethod == :page_title
        undef_method imethod
      end
    end
  end
end
