# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `rails-dom-testing` gem.
# Please instead update this file by running `bin/tapioca gem rails-dom-testing`.

# source://rails-dom-testing//lib/rails/dom/testing/assertions/dom_assertions.rb#3
module Rails
  class << self
    # source://railties/7.0.7.2/lib/rails.rb#38
    def app_class; end

    # source://railties/7.0.7.2/lib/rails.rb#38
    def app_class=(_arg0); end

    # source://railties/7.0.7.2/lib/rails.rb#39
    def application; end

    # source://railties/7.0.7.2/lib/rails.rb#37
    def application=(_arg0); end

    # source://railties/7.0.7.2/lib/rails.rb#123
    def autoloaders; end

    # source://railties/7.0.7.2/lib/rails.rb#50
    def backtrace_cleaner; end

    # source://railties/7.0.7.2/lib/rails.rb#38
    def cache; end

    # source://railties/7.0.7.2/lib/rails.rb#38
    def cache=(_arg0); end

    # source://railties/7.0.7.2/lib/rails.rb#46
    def configuration; end

    # source://railties/7.0.7.2/lib/rails.rb#72
    def env; end

    # source://railties/7.0.7.2/lib/rails.rb#79
    def env=(environment); end

    # source://railties/7.0.7.2/lib/rails.rb#90
    def error; end

    # source://railties/7.0.7.2/lib/rails/gem_version.rb#5
    def gem_version; end

    # source://railties/7.0.7.2/lib/rails.rb#103
    def groups(*groups); end

    # source://railties/7.0.7.2/lib/rails.rb#43
    def initialize!(*_arg0, &_arg1); end

    # source://railties/7.0.7.2/lib/rails.rb#43
    def initialized?(*_arg0, &_arg1); end

    # source://railties/7.0.7.2/lib/rails.rb#38
    def logger; end

    # source://railties/7.0.7.2/lib/rails.rb#38
    def logger=(_arg0); end

    # source://railties/7.0.7.2/lib/rails.rb#119
    def public_path; end

    # source://railties/7.0.7.2/lib/rails.rb#63
    def root; end

    # source://railties/7.0.7.2/lib/rails/version.rb#7
    def version; end
  end
end

# source://rails-dom-testing//lib/rails/dom/testing/assertions/dom_assertions.rb#4
module Rails::Dom; end

# source://rails-dom-testing//lib/rails/dom/testing/assertions/dom_assertions.rb#5
module Rails::Dom::Testing
  # source://rails-dom-testing//lib/rails/dom/testing.rb#12
  def default_html_version; end

  # source://rails-dom-testing//lib/rails/dom/testing.rb#12
  def default_html_version=(val); end

  class << self
    # source://rails-dom-testing//lib/rails/dom/testing.rb#12
    def default_html_version; end

    # source://rails-dom-testing//lib/rails/dom/testing.rb#12
    def default_html_version=(val); end

    # source://rails-dom-testing//lib/rails/dom/testing.rb#15
    def html5_support?; end

    # source://rails-dom-testing//lib/rails/dom/testing.rb#19
    def html_document(html_version: T.unsafe(nil)); end

    # source://rails-dom-testing//lib/rails/dom/testing.rb#26
    def html_document_fragment(html_version: T.unsafe(nil)); end

    private

    # source://rails-dom-testing//lib/rails/dom/testing.rb#34
    def choose_html_parser(parser_classes, html_version: T.unsafe(nil)); end
  end
end

# source://rails-dom-testing//lib/rails/dom/testing/assertions/dom_assertions.rb#6
module Rails::Dom::Testing::Assertions
  include ::Rails::Dom::Testing::Assertions::DomAssertions
  include ::Rails::Dom::Testing::Assertions::SelectorAssertions
end

# source://rails-dom-testing//lib/rails/dom/testing/assertions/dom_assertions.rb#7
module Rails::Dom::Testing::Assertions::DomAssertions
  # source://rails-dom-testing//lib/rails/dom/testing/assertions/dom_assertions.rb#35
  def assert_dom_equal(expected, actual, message = T.unsafe(nil), strict: T.unsafe(nil), html_version: T.unsafe(nil)); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/dom_assertions.rb#68
  def assert_dom_not_equal(expected, actual, message = T.unsafe(nil), strict: T.unsafe(nil), html_version: T.unsafe(nil)); end

  protected

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/dom_assertions.rb#75
  def compare_doms(expected, actual, strict); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/dom_assertions.rb#128
  def equal_attribute?(attr, other_attr); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/dom_assertions.rb#115
  def equal_attribute_nodes?(nodes, other_nodes); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/dom_assertions.rb#107
  def equal_child?(child, other_child, strict); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/dom_assertions.rb#95
  def equal_children?(child, other_child, strict); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/dom_assertions.rb#87
  def extract_children(node, strict); end

  private

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/dom_assertions.rb#133
  def fragment(text, html_version: T.unsafe(nil)); end
end

# source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/substitution_context.rb#7
module Rails::Dom::Testing::Assertions::SelectorAssertions
  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions.rb#163
  def assert_dom(*args, &block); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions.rb#285
  def assert_dom_email(html_version: T.unsafe(nil), &block); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions.rb#232
  def assert_dom_encoded(element = T.unsafe(nil), html_version: T.unsafe(nil), &block); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions.rb#163
  def assert_select(*args, &block); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions.rb#285
  def assert_select_email(html_version: T.unsafe(nil), &block); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions.rb#232
  def assert_select_encoded(element = T.unsafe(nil), html_version: T.unsafe(nil), &block); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions.rb#58
  def css_select(*args); end

  private

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions.rb#307
  def assert_size_match!(size, equals, css_selector, message = T.unsafe(nil)); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions.rb#319
  def count_description(min, max, count); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions.rb#301
  def document_root_element; end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions.rb#335
  def nest_selection(selection); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions.rb#344
  def nodeset(node); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions.rb#331
  def pluralize_element(quantity); end
end

# source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/html_selector.rb#12
class Rails::Dom::Testing::Assertions::SelectorAssertions::HTMLSelector
  include ::Minitest::Assertions

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/html_selector.rb#17
  def initialize(values, previous_selection = T.unsafe(nil), &root_fallback); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/html_selector.rb#46
  def context; end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/html_selector.rb#13
  def css_selector; end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/html_selector.rb#13
  def message; end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/html_selector.rb#39
  def select; end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/html_selector.rb#33
  def selecting_no_body?; end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/html_selector.rb#13
  def tests; end

  private

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/html_selector.rb#100
  def extract_equality_tests; end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/html_selector.rb#72
  def extract_root(previous_selection, root_fallback); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/html_selector.rb#89
  def extract_selectors; end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/html_selector.rb#48
  def filter(matches); end

  class << self
    # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/html_selector.rb#46
    def context; end
  end
end

# source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/html_selector.rb#44
Rails::Dom::Testing::Assertions::SelectorAssertions::HTMLSelector::NO_STRIP = T.let(T.unsafe(nil), Array)

# source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/substitution_context.rb#8
class Rails::Dom::Testing::Assertions::SelectorAssertions::SubstitutionContext
  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/substitution_context.rb#9
  def initialize; end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/substitution_context.rb#20
  def match(matches, attribute, matcher); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/substitution_context.rb#13
  def substitute!(selector, values, format_for_presentation = T.unsafe(nil)); end

  private

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/substitution_context.rb#25
  def matcher_for(value, format_for_presentation); end

  # source://rails-dom-testing//lib/rails/dom/testing/assertions/selector_assertions/substitution_context.rb#36
  def substitutable?(value); end
end

# source://rails-dom-testing//lib/rails/dom/testing/railtie.rb#6
class Rails::Dom::Testing::Railtie < ::Rails::Railtie; end