# typed: true
# frozen_string_literal: true

module Super
  module Useful
    module I19
      include Kernel

      module_function

      def build_chain(prefix, optional, suffix)
        prefix = Array(prefix)
        optional = Array(optional)
        suffix = Array(suffix)

        result = []

        (optional.size + 1).times do
          lookup = [prefix, optional, suffix].flatten.join(".").to_sym
          result.push(lookup)
          optional.pop
        end

        result
      end

      def chain_to_i18n(chain)
        head, *tail = chain

        [head, { default: tail }]
      end

      def i18n_with_fallback(prefix, optional, suffix)
        chain_to_i18n(build_chain(prefix, optional, suffix))
      end
    end
  end
end
