# frozen_string_literal: true

module Super
  module Reset
    extend ActiveSupport::Concern

    KEEP = {
      # Defined by Rails
      _layout: true,
      _generate_paths_by_default: true,

      # Defined in Super::SubstructureController
      navigation: true,
      page_title: true,

      # Defined in Super::ApplicationController
      current_action: true,
      with_current_action: true,
    }

    included do
      undef_method :index
      undef_method :show
      undef_method :new
      undef_method :create
      undef_method :edit
      undef_method :update
      undef_method :destroy

      Super::SubstructureController.private_instance_methods(false).each do |imethod|
        next if KEEP.key?(imethod)
        undef_method imethod
      end

      Super::ApplicationController.private_instance_methods(false).each do |imethod|
        next if KEEP.key?(imethod)
        undef_method imethod
      end
    end
  end
end
