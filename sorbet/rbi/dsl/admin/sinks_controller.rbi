# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for dynamic methods in `Admin::SinksController`.
# Please instead update this file by running `bin/tapioca dsl Admin::SinksController`.

class Admin::SinksController
  sig { returns(HelperProxy) }
  def helpers; end

  module HelperMethods
    include ::ActionController::Base::HelperMethods
    include ::Super::FoundationController::HelperMethods
    include ::Super::SubstructureController::HelperMethods
    include ::Super::SitewideController::HelperMethods
    include ::Super::ViewHelper
  end

  class HelperProxy < ::ActionView::Base
    include HelperMethods
  end
end
