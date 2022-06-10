# frozen_string_literal: true

module Super
  # These methods could be useful for any Super controller, resourceful or not.
  class SitewideController < SubstructureController
    private

    # @return [String]
    helper_method def site_title
      Super.configuration.title
    end

    # @return [Super::Navigation]
    helper_method def site_navigation
      Super::Navigation.new(&:all)
    end

    # @return [String]
    helper_method def document_title
      if instance_variable_defined?(:@document_title)
        return @document_title
      end

      document_title_segments.map(&:presence).compact.join(document_title_separator)
    end

    def document_title_segments
      @document_title_segments ||= [page_title, site_title]
    end

    # @return [String]
    def document_title_separator
      @document_title_separator ||= " - "
    end
  end
end
