# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for dynamic methods in `Super::SubstructureController`.
# Please instead update this file by running `bin/tapioca dsl Super::SubstructureController`.

class Super::SubstructureController
  sig { returns(HelperProxy) }
  def helpers; end

  module HelperMethods
    include ::ActionController::Base::HelperMethods
    include ::Super::FoundationController::HelperMethods

    sig { returns(T.untyped) }
    def base_scope; end

    sig { returns(T.untyped) }
    def batch_actions; end

    sig { returns(T.untyped) }
    def batch_actions_enabled?; end

    sig { returns(T.untyped) }
    def collection_actions; end

    sig { returns(T.untyped) }
    def csv_enabled?; end

    sig { returns(T.untyped) }
    def default_sort; end

    sig { returns(T.untyped) }
    def display_schema; end

    sig { returns(T.untyped) }
    def filter_schema; end

    sig { returns(T.untyped) }
    def filters_enabled?; end

    sig { params(record: T.untyped).returns(T.untyped) }
    def form_action(record); end

    sig { params(record: T.untyped).returns(T.untyped) }
    def form_record(record); end

    sig { returns(T.untyped) }
    def form_schema; end

    sig { params(record: T.untyped).returns(T.untyped) }
    def member_actions(record); end

    sig { returns(T.untyped) }
    def model; end

    sig { returns(T.untyped) }
    def page_title; end

    sig { params(page_query_params: T.untyped).returns(T.untyped) }
    def paginated_link(page_query_params); end

    sig { returns(T.untyped) }
    def pagination_disabled_param; end

    sig { returns(T.untyped) }
    def permitted_params; end

    sig { returns(T.untyped) }
    def query; end

    sig { returns(T.untyped) }
    def records_per_page; end

    sig { params(action: T.untyped).returns(T.untyped) }
    def resolve_collection_action(action); end

    sig { params(action: T.untyped, record: T.untyped).returns(T.untyped) }
    def resolve_member_action(action, record); end

    sig { returns(T.untyped) }
    def resolved_collection_actions; end

    sig { params(record: T.untyped).returns(T.untyped) }
    def resolved_member_actions(record); end

    sig { returns(T.untyped) }
    def sort_enabled?; end

    sig { returns(T.untyped) }
    def sortable_columns; end

    sig { returns(T.untyped) }
    def title; end
  end

  class HelperProxy < ::ActionView::Base
    include HelperMethods
  end
end
