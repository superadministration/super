# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `minitest-bisect` gem.
# Please instead update this file by running `bin/tapioca gem minitest-bisect`.

# source://minitest-bisect//lib/minitest/find_minimal_combination.rb#109
class Array
  include ::Enumerable

  # source://minitest-bisect//lib/minitest/find_minimal_combination.rb#113
  def find_minimal_combination(&test); end

  # source://minitest-bisect//lib/minitest/find_minimal_combination.rb#117
  def find_minimal_combination_and_count; end
end

# source://minitest-bisect//lib/minitest/find_minimal_combination.rb#7
class ComboFinder
  # source://minitest-bisect//lib/minitest/find_minimal_combination.rb#89
  def cache_result(result, data, cache); end

  # source://minitest-bisect//lib/minitest/find_minimal_combination.rb#85
  def d(s = T.unsafe(nil)); end

  # source://minitest-bisect//lib/minitest/find_minimal_combination.rb#30
  def find_minimal_combination(ary); end
end

# source://minitest-bisect//lib/minitest/bisect.rb#7
module Minitest
  class << self
    # source://minitest/5.20.0/lib/minitest.rb#176
    def __run(reporter, options); end

    # source://minitest/5.20.0/lib/minitest.rb#97
    def after_run(&block); end

    # source://minitest/5.20.0/lib/minitest.rb#19
    def allow_fork; end

    # source://minitest/5.20.0/lib/minitest.rb#19
    def allow_fork=(_arg0); end

    # source://minitest/5.20.0/lib/minitest.rb#69
    def autorun; end

    # source://minitest/5.20.0/lib/minitest.rb#19
    def backtrace_filter; end

    # source://minitest/5.20.0/lib/minitest.rb#19
    def backtrace_filter=(_arg0); end

    # source://minitest/5.20.0/lib/minitest.rb#18
    def cattr_accessor(name); end

    # source://minitest/5.20.0/lib/minitest.rb#1102
    def clock_time; end

    # source://minitest/5.20.0/lib/minitest.rb#19
    def extensions; end

    # source://minitest/5.20.0/lib/minitest.rb#19
    def extensions=(_arg0); end

    # source://minitest/5.20.0/lib/minitest.rb#267
    def filter_backtrace(bt); end

    # source://minitest/5.20.0/lib/minitest.rb#19
    def info_signal; end

    # source://minitest/5.20.0/lib/minitest.rb#19
    def info_signal=(_arg0); end

    # source://minitest/5.20.0/lib/minitest.rb#101
    def init_plugins(options); end

    # source://minitest/5.20.0/lib/minitest.rb#108
    def load_plugins; end

    # source://minitest/5.20.0/lib/minitest.rb#19
    def parallel_executor; end

    # source://minitest/5.20.0/lib/minitest.rb#19
    def parallel_executor=(_arg0); end

    # source://minitest/5.20.0/lib/minitest.rb#189
    def process_args(args = T.unsafe(nil)); end

    # source://minitest/5.20.0/lib/minitest.rb#19
    def reporter; end

    # source://minitest/5.20.0/lib/minitest.rb#19
    def reporter=(_arg0); end

    # source://minitest/5.20.0/lib/minitest.rb#143
    def run(args = T.unsafe(nil)); end

    # source://minitest/5.20.0/lib/minitest.rb#1093
    def run_one_method(klass, method_name); end

    # source://minitest/5.20.0/lib/minitest.rb#19
    def seed; end

    # source://minitest/5.20.0/lib/minitest.rb#19
    def seed=(_arg0); end
  end
end

# source://minitest-bisect//lib/minitest/bisect.rb#12
class Minitest::Bisect
  # source://minitest-bisect//lib/minitest/bisect.rb#93
  def initialize; end

  # source://minitest-bisect//lib/minitest/bisect.rb#163
  def bisect_methods(files, rb_flags, mt_flags); end

  # source://minitest-bisect//lib/minitest/bisect.rb#237
  def build_files_cmd(culprits, rb, mt); end

  # source://minitest-bisect//lib/minitest/bisect.rb#243
  def build_methods_cmd(cmd, culprits = T.unsafe(nil), bad = T.unsafe(nil)); end

  # source://minitest-bisect//lib/minitest/bisect.rb#261
  def build_re(bad); end

  # source://minitest-bisect//lib/minitest/bisect.rb#75
  def culprits; end

  # source://minitest-bisect//lib/minitest/bisect.rb#75
  def culprits=(_arg0); end

  # source://minitest-bisect//lib/minitest/bisect.rb#70
  def failures; end

  # source://minitest-bisect//lib/minitest/bisect.rb#70
  def failures=(_arg0); end

  # source://minitest-bisect//lib/minitest/bisect.rb#229
  def map_failures; end

  # source://minitest-bisect//lib/minitest/bisect.rb#292
  def minitest_result(file, klass, method, fails, assertions, time); end

  # source://minitest-bisect//lib/minitest/bisect.rb#288
  def minitest_start; end

  # source://minitest-bisect//lib/minitest/bisect.rb#281
  def re_escape(str); end

  # source://minitest-bisect//lib/minitest/bisect.rb#101
  def reset; end

  # source://minitest-bisect//lib/minitest/bisect.rb#112
  def run(args); end

  # source://minitest-bisect//lib/minitest/bisect.rb#77
  def seen_bad; end

  # source://minitest-bisect//lib/minitest/bisect.rb#77
  def seen_bad=(_arg0); end

  # source://minitest-bisect//lib/minitest/bisect.rb#62
  def tainted; end

  # source://minitest-bisect//lib/minitest/bisect.rb#62
  def tainted=(_arg0); end

  # source://minitest-bisect//lib/minitest/bisect.rb#62
  def tainted?; end

  # source://minitest-bisect//lib/minitest/bisect.rb#222
  def time_it(prompt, cmd); end

  class << self
    # source://minitest-bisect//lib/minitest/bisect.rb#82
    def run(files); end
  end
end

# source://minitest-bisect//lib/minitest/bisect.rb#15
class Minitest::Bisect::PathExpander < ::PathExpander
  # source://minitest-bisect//lib/minitest/bisect.rb#20
  def initialize(args = T.unsafe(nil)); end

  # source://minitest-bisect//lib/minitest/bisect.rb#30
  def process_flags(flags); end

  # source://minitest-bisect//lib/minitest/bisect.rb#18
  def rb_flags; end

  # source://minitest-bisect//lib/minitest/bisect.rb#18
  def rb_flags=(_arg0); end
end

# source://minitest-bisect//lib/minitest/bisect.rb#16
Minitest::Bisect::PathExpander::TEST_GLOB = T.let(T.unsafe(nil), String)

# source://minitest-bisect//lib/minitest/bisect.rb#54
Minitest::Bisect::RUBY = T.let(T.unsafe(nil), String)

# source://minitest-bisect//lib/minitest/bisect.rb#47
Minitest::Bisect::SHH = T.let(T.unsafe(nil), String)

# source://minitest-bisect//lib/minitest/bisect.rb#13
Minitest::Bisect::VERSION = T.let(T.unsafe(nil), String)