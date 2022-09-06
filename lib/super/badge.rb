# typed: strict
# frozen_string_literal: true

module Super
  class Badge
    extend T::Sig

    STYLES = T.let(
      {
        light: "bg-gray-100 text-black",
        dark: "bg-gray-900 text-white",
        red: "bg-red-700 text-white",
        yellow: "bg-yellow-400 text-black",
        green: "bg-green-700 text-white",
        blue: "bg-blue-700 text-white",
        purple: "bg-purple-800 text-white",
      },
      T::Hash[Symbol, String]
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
      @styles ||= COMMON_STYLES + [STYLES.fetch(@style)]
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
