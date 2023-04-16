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
      purple: "bg-purple-800 text-white"
    }

    def initialize(text, style:)
      if !STYLES.key?(style)
        raise Super::Error::Initialization, "`style:` must be one of #{STYLES.keys.inspect}"
      end

      @text = text
      @style = style
    end

    def styles
      return @styles if instance_variable_defined?(:@styles)

      @styles = COMMON_STYLES + [STYLES.fetch(@style)]
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
