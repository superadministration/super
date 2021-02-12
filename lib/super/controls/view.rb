# frozen_string_literal: true

module Super
  class Controls
    # Methods for `Controls` that have a sane default implementation
    module View
      def index_view
        Super::Layout.new(
          mains: [
            Super::Panel.new(
              Super::Partial.new("collection_header"),
              :@display
            ),
          ],
          asides: [
            :@query_form,
          ]
        )
      end

      def show_view
        Super::Layout.new(
          mains: [
            Super::Panel.new(
              Super::Partial.new("member_header"),
              :@display
            ),
          ]
        )
      end

      def new_view
        Super::Layout.new(
          mains: [
            Super::Panel.new(
              Super::Partial.new("collection_header"),
              :@form
            ),
          ]
        )
      end

      def edit_view
        Super::Layout.new(
          mains: [
            Super::Panel.new(
              Super::Partial.new("member_header"),
              :@form
            ),
          ]
        )
      end
    end
  end
end
