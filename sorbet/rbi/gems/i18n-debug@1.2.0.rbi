# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `i18n-debug` gem.
# Please instead update this file by running `bin/tapioca gem i18n-debug`.

# :enddoc:
module I18n
  extend ::I18n::Base

  class << self
    def cache_key_digest; end
    def cache_key_digest=(key_digest); end
    def cache_namespace; end
    def cache_namespace=(namespace); end
    def cache_store; end
    def cache_store=(store); end
    def fallbacks; end
    def fallbacks=(fallbacks); end
    def interpolate(string, values); end
    def interpolate_hash(string, values); end
    def new_double_nested_cache; end
    def perform_caching?; end
    def reserve_key(key); end
    def reserved_keys_pattern; end
  end
end

I18n::DEFAULT_INTERPOLATION_PATTERNS = T.let(T.unsafe(nil), Array)

module I18n::Debug
  class << self
    # Returns the value of attribute logger.
    def logger; end

    # Sets the attribute logger
    #
    # @param value the value to set the attribute logger to.
    def logger=(_arg0); end

    def on_lookup(&blk); end

    # Sets the attribute on_lookup
    #
    # @param value the value to set the attribute on_lookup to.
    def on_lookup=(_arg0); end
  end
end

module I18n::Debug::Hook
  protected

  def lookup(*args); end
end

I18n::Debug::VERSION = T.let(T.unsafe(nil), String)
I18n::EMPTY_HASH = T.let(T.unsafe(nil), Hash)
I18n::INTERPOLATION_PATTERN = T.let(T.unsafe(nil), Regexp)
I18n::JSON = ActiveSupport::JSON
I18n::RESERVED_KEYS = T.let(T.unsafe(nil), Array)
I18n::VERSION = T.let(T.unsafe(nil), String)