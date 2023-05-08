# typed: true
# frozen_string_literal: true

module Super
  # These methods define what each resourceful Super admin page looks like.
  # Generally, the return value of each of these methods should be set to
  # `@view`.
  class ViewController < SitewideController
    private

    # @return [#to_partial_path]
    def index_view
      Super::Layout.new(
        main: Super::ViewChain.new(
          main_panel: Super::Panel.new,
          batch_form: Super::Partial.new("batch_form"),
          main_header: Super::Partial.new("collection_header"),
          main: :@display
        ),
        aside: Super::ViewChain.new(
          query_panel: Super::Panel.new,
          query: query
        )
      )
    end

    # @return [#to_partial_path]
    def show_view
      Super::Layout.new(
        main: Super::ViewChain.new(
          main_panel: Super::Panel.new,
          main_header: Super::Partial.new("member_header"),
          main: :@display
        )
      )
    end

    # @return [#to_partial_path]
    def new_view
      Super::Layout.new(
        main: Super::ViewChain.new(
          main_panel: Super::Panel.new,
          main_header: Super::Partial.new("collection_header"),
          main: :@form
        )
      )
    end

    # @return [#to_partial_path]
    def edit_view
      Super::Layout.new(
        main: Super::ViewChain.new(
          main_panel: Super::Panel.new,
          main_header: Super::Partial.new("member_header"),
          main: :@form
        )
      )
    end
  end
end
