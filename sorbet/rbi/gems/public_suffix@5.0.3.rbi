# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `public_suffix` gem.
# Please instead update this file by running `bin/tapioca gem public_suffix`.

# source://public_suffix//lib/public_suffix/domain.rb#9
module PublicSuffix
  class << self
    # source://public_suffix//lib/public_suffix.rb#149
    def decompose(name, rule); end

    # source://public_suffix//lib/public_suffix.rb#140
    def domain(name, **options); end

    # source://public_suffix//lib/public_suffix.rb#164
    def normalize(name); end

    # source://public_suffix//lib/public_suffix.rb#67
    def parse(name, list: T.unsafe(nil), default_rule: T.unsafe(nil), ignore_private: T.unsafe(nil)); end

    # source://public_suffix//lib/public_suffix.rb#123
    def valid?(name, list: T.unsafe(nil), default_rule: T.unsafe(nil), ignore_private: T.unsafe(nil)); end
  end
end

# source://public_suffix//lib/public_suffix.rb#26
PublicSuffix::BANG = T.let(T.unsafe(nil), String)

# source://public_suffix//lib/public_suffix.rb#25
PublicSuffix::DOT = T.let(T.unsafe(nil), String)

# source://public_suffix//lib/public_suffix/domain.rb#12
class PublicSuffix::Domain
  # source://public_suffix//lib/public_suffix/domain.rb#65
  def initialize(*args); end

  # source://public_suffix//lib/public_suffix/domain.rb#137
  def domain; end

  # source://public_suffix//lib/public_suffix/domain.rb#198
  def domain?; end

  # source://public_suffix//lib/public_suffix/domain.rb#105
  def name; end

  # source://public_suffix//lib/public_suffix/domain.rb#33
  def sld; end

  # source://public_suffix//lib/public_suffix/domain.rb#169
  def subdomain; end

  # source://public_suffix//lib/public_suffix/domain.rb#229
  def subdomain?; end

  # source://public_suffix//lib/public_suffix/domain.rb#33
  def tld; end

  # source://public_suffix//lib/public_suffix/domain.rb#89
  def to_a; end

  # source://public_suffix//lib/public_suffix/domain.rb#73
  def to_s; end

  # source://public_suffix//lib/public_suffix/domain.rb#33
  def trd; end

  class << self
    # source://public_suffix//lib/public_suffix/domain.rb#28
    def name_to_labels(name); end
  end
end

# source://public_suffix//lib/public_suffix/errors.rb#25
class PublicSuffix::DomainInvalid < ::PublicSuffix::Error; end

# source://public_suffix//lib/public_suffix/errors.rb#38
class PublicSuffix::DomainNotAllowed < ::PublicSuffix::DomainInvalid; end

# source://public_suffix//lib/public_suffix/errors.rb#11
class PublicSuffix::Error < ::StandardError; end

# source://public_suffix//lib/public_suffix/list.rb#40
class PublicSuffix::List
  # source://public_suffix//lib/public_suffix/list.rb#106
  def initialize; end

  # source://public_suffix//lib/public_suffix/list.rb#141
  def <<(rule); end

  # source://public_suffix//lib/public_suffix/list.rb#120
  def ==(other); end

  # source://public_suffix//lib/public_suffix/list.rb#141
  def add(rule); end

  # source://public_suffix//lib/public_suffix/list.rb#164
  def clear; end

  # source://public_suffix//lib/public_suffix/list.rb#226
  def default_rule; end

  # source://public_suffix//lib/public_suffix/list.rb#128
  def each(&block); end

  # source://public_suffix//lib/public_suffix/list.rb#157
  def empty?; end

  # source://public_suffix//lib/public_suffix/list.rb#120
  def eql?(other); end

  # source://public_suffix//lib/public_suffix/list.rb#174
  def find(name, default: T.unsafe(nil), **options); end

  # source://public_suffix//lib/public_suffix/list.rb#150
  def size; end

  protected

  # source://public_suffix//lib/public_suffix/list.rb#233
  def rules; end

  private

  # source://public_suffix//lib/public_suffix/list.rb#238
  def entry_to_rule(entry, value); end

  # source://public_suffix//lib/public_suffix/list.rb#242
  def rule_to_entry(rule); end

  # source://public_suffix//lib/public_suffix/list.rb#199
  def select(name, ignore_private: T.unsafe(nil)); end

  class << self
    # source://public_suffix//lib/public_suffix/list.rb#50
    def default(**options); end

    # source://public_suffix//lib/public_suffix/list.rb#58
    def default=(value); end

    # source://public_suffix//lib/public_suffix/list.rb#69
    def parse(input, private_domains: T.unsafe(nil)); end
  end
end

# source://public_suffix//lib/public_suffix/list.rb#42
PublicSuffix::List::DEFAULT_LIST_PATH = T.let(T.unsafe(nil), String)

# source://public_suffix//lib/public_suffix/rule.rb#22
module PublicSuffix::Rule
  class << self
    # source://public_suffix//lib/public_suffix/rule.rb#344
    def default; end

    # source://public_suffix//lib/public_suffix/rule.rb#326
    def factory(content, private: T.unsafe(nil)); end
  end
end

# source://public_suffix//lib/public_suffix/rule.rb#102
class PublicSuffix::Rule::Base
  # source://public_suffix//lib/public_suffix/rule.rb#126
  def initialize(value:, length: T.unsafe(nil), private: T.unsafe(nil)); end

  # source://public_suffix//lib/public_suffix/rule.rb#137
  def ==(other); end

  # source://public_suffix//lib/public_suffix/rule.rb#180
  def decompose(*_arg0); end

  # source://public_suffix//lib/public_suffix/rule.rb#137
  def eql?(other); end

  # source://public_suffix//lib/public_suffix/rule.rb#108
  def length; end

  # source://public_suffix//lib/public_suffix/rule.rb#163
  def match?(name); end

  # source://public_suffix//lib/public_suffix/rule.rb#173
  def parts; end

  # source://public_suffix//lib/public_suffix/rule.rb#111
  def private; end

  # source://public_suffix//lib/public_suffix/rule.rb#105
  def value; end

  class << self
    # source://public_suffix//lib/public_suffix/rule.rb#118
    def build(content, private: T.unsafe(nil)); end
  end
end

# source://public_suffix//lib/public_suffix/rule.rb#25
class PublicSuffix::Rule::Entry < ::Struct
  def length; end

  # source://public_suffix//lib/public_suffix/rule.rb#25
  def length=(_); end

  def private; end

  # source://public_suffix//lib/public_suffix/rule.rb#25
  def private=(_); end

  def type; end

  # source://public_suffix//lib/public_suffix/rule.rb#25
  def type=(_); end

  class << self
    def [](*_arg0); end
    def inspect; end
    def members; end
    def new(*_arg0); end
  end
end

# source://public_suffix//lib/public_suffix/rule.rb#265
class PublicSuffix::Rule::Exception < ::PublicSuffix::Rule::Base
  # source://public_suffix//lib/public_suffix/rule.rb#286
  def decompose(domain); end

  # source://public_suffix//lib/public_suffix/rule.rb#301
  def parts; end

  # source://public_suffix//lib/public_suffix/rule.rb#278
  def rule; end

  class << self
    # source://public_suffix//lib/public_suffix/rule.rb#271
    def build(content, private: T.unsafe(nil)); end
  end
end

# source://public_suffix//lib/public_suffix/rule.rb#187
class PublicSuffix::Rule::Normal < ::PublicSuffix::Rule::Base
  # source://public_suffix//lib/public_suffix/rule.rb#200
  def decompose(domain); end

  # source://public_suffix//lib/public_suffix/rule.rb#210
  def parts; end

  # source://public_suffix//lib/public_suffix/rule.rb#192
  def rule; end
end

# source://public_suffix//lib/public_suffix/rule.rb#217
class PublicSuffix::Rule::Wildcard < ::PublicSuffix::Rule::Base
  # source://public_suffix//lib/public_suffix/rule.rb#232
  def initialize(value:, length: T.unsafe(nil), private: T.unsafe(nil)); end

  # source://public_suffix//lib/public_suffix/rule.rb#248
  def decompose(domain); end

  # source://public_suffix//lib/public_suffix/rule.rb#258
  def parts; end

  # source://public_suffix//lib/public_suffix/rule.rb#240
  def rule; end

  class << self
    # source://public_suffix//lib/public_suffix/rule.rb#223
    def build(content, private: T.unsafe(nil)); end
  end
end

# source://public_suffix//lib/public_suffix.rb#27
PublicSuffix::STAR = T.let(T.unsafe(nil), String)

# source://public_suffix//lib/public_suffix/version.rb#12
PublicSuffix::VERSION = T.let(T.unsafe(nil), String)