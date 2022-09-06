# typed: strict
# frozen_string_literal: true

module Super
  class Badge
    extend T::Sig

    STYLES = T.let(
      {
        light: %w[bg-gray-100 text-black],
        dark: %w[bg-gray-900 text-white],
        red: %w[bg-red-700 text-white],
        yellow: %w[bg-yellow-400 text-black],
        green: %w[bg-green-700 text-white],
        blue: %w[bg-blue-700 text-white],
        purple: %w[bg-purple-800 text-white]
      },
      T::Hash[Symbol, T::Array[String]]
    )

    sig { params(text: String, style: Symbol).void }
    def initialize(text, style:)
      if !STYLES.key?(style)
        raise Super::Error::Initialization, "`style:` must be one of #{STYLES.keys.inspect}"
      end

      @text = text
      @style = style
      @styles = T.let(nil, T.nilable(T::Array[String]))
    end

    sig { returns(T::Array[String]) }
    def styles
      @styles ||= COMMON_STYLES + STYLES.fetch(@style)
    end

    sig { returns(String) }
    def to_s
      ActionController::Base.helpers.content_tag(
        :span,
        @text,
        class: styles.join(" ")
      )
    end

    private

    COMMON_STYLES = T.let(%w[rounded px-2 py-1 text-xs leading-none font-bold], T::Array[String])
    private_constant :COMMON_STYLES
  end
end
