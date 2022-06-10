# typed: true
# frozen_string_literal: true

module Super
  module Reset
    extend ActiveSupport::Concern

    KEEP = {
      # Defined by Rails
      _layout: true,
      _generate_paths_by_default: true,

      # Defined in Super::SubstructureController
      page_title: true,

      # Keep all of the ones in Super::SitewideController
    }

    included do
      undef_method :index
      undef_method :show
      undef_method :new
      undef_method :create
      undef_method :edit
      undef_method :update
      undef_method :destroy

      Super::ViewController.private_instance_methods(false).each do |imethod|
        next if KEEP.key?(imethod)
        undef_method imethod
      end

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
