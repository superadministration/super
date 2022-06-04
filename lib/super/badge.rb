# frozen_string_literal: true

module Super
  class Badge
    STYLES = {
      light: "bg-gray-100 text-black",
      dark: "bg-gray-900 text-white",
      red: "bg-red-700 text-white",
      yellow: "bg-yellow-400 text-black",
      green: "bg-green-700 text-white",
      blue: "bg-blue-700 text-white",
      purple: "bg-purple-800 text-white",
    }

    def initialize(text, style: nil, styles: nil)
      @text = text
      if styles.present?
        Super::Useful::Deprecation["0.22"].deprecation_warning("styles:", "use `style:` with a single style")
      end
      @requested_styles = Array(styles.presence).flatten + Array(style.presence).flatten
      if @requested_styles.any? { |s| s.is_a?(String) }
        Super::Useful::Deprecation["0.22"].warn("Super::Badge.new(text, style:) accepts exactly one Symbol style from this list #{STYLES.keys.inspect}")
      end
      if @requested_styles.size != 1
        Super::Useful::Deprecation["0.22"].warn("Super::Badge.new(text, style:) accepts exactly one style, but it received #{@requested_styles.size}")
      end
    end

    def styles
      return @styles if instance_variable_defined?(:@styles)
      @styles =
        if requested_styles.delete(:reset)
          []
        else
          COMMON_STYLES
        end

      if requested_styles.empty?
        @styles += [STYLES[:light]]
      else
        requested_styles.each do |style|
          @styles +=
            if STYLES.key?(style)
              [STYLES[style]]
            else
              [style]
            end
        end
      end

      @styles
    end

    def to_s
      ActionController::Base.helpers.content_tag(
        :span,
        @text,
        class: styles.join(" ")
      )
    end

    private

    COMMON_STYLES = %w[rounded px-2 py-1 text-xs leading-none font-bold]
    private_constant :COMMON_STYLES

    attr_reader :requested_styles
  end
end
