# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `base64` gem.
# Please instead update this file by running `bin/tapioca gem base64`.

# source://base64//lib/base64.rb#24
module Base64
  private

  # source://base64//lib/base64.rb#58
  def decode64(str); end

  # source://base64//lib/base64.rb#38
  def encode64(bin); end

  # source://base64//lib/base64.rb#73
  def strict_decode64(str); end

  # source://base64//lib/base64.rb#65
  def strict_encode64(bin); end

  # source://base64//lib/base64.rb#98
  def urlsafe_decode64(str); end

  # source://base64//lib/base64.rb#83
  def urlsafe_encode64(bin, padding: T.unsafe(nil)); end

  class << self
    # source://base64//lib/base64.rb#58
    def decode64(str); end

    # source://base64//lib/base64.rb#38
    def encode64(bin); end

    # source://base64//lib/base64.rb#73
    def strict_decode64(str); end

    # source://base64//lib/base64.rb#65
    def strict_encode64(bin); end

    # source://base64//lib/base64.rb#98
    def urlsafe_decode64(str); end

    # source://base64//lib/base64.rb#83
    def urlsafe_encode64(bin, padding: T.unsafe(nil)); end
  end
end