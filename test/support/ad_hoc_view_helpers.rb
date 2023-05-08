# typed: false

module AdHocViewHelpers
  extend ActiveSupport::Concern

  included do
    setup do
      if respond_to?(:ad_hoc_view_helpers)
        view.extend(ad_hoc_view_helpers)
      end
    end
  end

  class_methods do
    def ad_hoc_view_helpers(&block)
      define_method(:ad_hoc_view_helpers) do
        @ad_hoc_view_helpers = Module.new(&block)
      end
    end
  end
end
