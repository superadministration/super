# typed: strong
# typed: false
# frozen_string_literal: true
module Super
  VERSION = T.let("0.21.0", T.untyped)

  sig { returns(Configuration) }
  def self.configuration; end

  # This schema type is used on your +#edit+ and +#new+ forms
  # 
  # ```ruby
  # class MembersController::Controls
  #   # ...
  # 
  #   def new_schema
  #     Super::Form.new do |fields, type|
  #       fields[:name] = type.string
  #       fields[:rank] = type.select
  #       fields[:position] = type.string
  #       fields[:ship_id] = type.select(
  #         collection: Ship.all.map { |s| ["#{s.name} (Ship ##{s.id})", s.id] },
  #       )
  #     end
  #   end
  # 
  #   # ...
  # end
  # ```
  class Form
    include Super::Schema::Common

    sig { void }
    def initialize; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def to_partial_path; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def each_attribute_name; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def each_attribute; end

    class Guesser
      # sord omit - no YARD type given for "model:", using untyped
      # sord omit - no YARD type given for "fields:", using untyped
      # sord omit - no YARD type given for "type:", using untyped
      sig { params(model: T.untyped, fields: T.untyped, type: T.untyped).void }
      def initialize(model:, fields:, type:); end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def call; end

      # sord omit - no YARD type given for "attribute_name", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(attribute_name: T.untyped).returns(T.untyped) }
      def attribute_type_for(attribute_name); end
    end

    class SchemaTypes
      # sord omit - no YARD type given for "fields:", using untyped
      sig { params(fields: T.untyped).void }
      def initialize(fields:); end

      # sord omit - no YARD type given for "partial_path", using untyped
      # sord omit - no YARD type given for "**extras", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(partial_path: T.untyped, extras: T.untyped).returns(T.untyped) }
      def partial(partial_path, **extras); end

      # sord omit - no YARD type given for "method_name", using untyped
      # sord omit - no YARD type given for "*args", using untyped
      # sord omit - no YARD type given for "super_builder:", using untyped
      # sord omit - no YARD type given for "**kwargs", using untyped
      # sord omit - no YARD return type given, using untyped
      sig do
        params(
          method_name: T.untyped,
          args: T.untyped,
          super_builder: T.untyped,
          kwargs: T.untyped
        ).returns(T.untyped)
      end
      def direct(method_name, *args, super_builder: true, **kwargs); end

      # sord omit - no YARD type given for "reader", using untyped
      # sord omit - no YARD type given for "**extras", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(reader: T.untyped, extras: T.untyped).returns(T.untyped) }
      def has_many(reader, **extras); end

      # sord omit - no YARD type given for "reader", using untyped
      # sord omit - no YARD type given for "**extras", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(reader: T.untyped, extras: T.untyped).returns(T.untyped) }
      def has_one(reader, **extras); end

      # sord omit - no YARD type given for "**extras", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(extras: T.untyped).returns(T.untyped) }
      def _destroy(**extras); end

      # sord omit - no YARD type given for "method_name", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(method_name: T.untyped).returns(T.untyped) }
      def self.define_schema_type_for(method_name); end

      class Direct
        # sord omit - no YARD type given for "super_builder:", using untyped
        # sord omit - no YARD type given for "method_name:", using untyped
        # sord omit - no YARD type given for "args:", using untyped
        # sord omit - no YARD type given for "kwargs:", using untyped
        sig do
          params(
            super_builder: T.untyped,
            method_name: T.untyped,
            args: T.untyped,
            kwargs: T.untyped
          ).void
        end
        def initialize(super_builder:, method_name:, args:, kwargs:); end

        # sord omit - no YARD return type given, using untyped
        sig { returns(T.untyped) }
        def nested_fields; end

        # sord omit - no YARD return type given, using untyped
        sig { returns(T.untyped) }
        def to_partial_path; end

        # sord omit - no YARD type given for "other", using untyped
        # sord omit - no YARD return type given, using untyped
        sig { params(other: T.untyped).returns(T.untyped) }
        def ==(other); end

        # sord omit - no YARD type given for :super_builder, using untyped
        # Returns the value of attribute super_builder.
        sig { returns(T.untyped) }
        attr_reader :super_builder

        # sord omit - no YARD type given for :method_name, using untyped
        # Returns the value of attribute method_name.
        sig { returns(T.untyped) }
        attr_reader :method_name

        # sord omit - no YARD type given for :args, using untyped
        # Returns the value of attribute args.
        sig { returns(T.untyped) }
        attr_reader :args

        # sord omit - no YARD type given for :kwargs, using untyped
        # Returns the value of attribute kwargs.
        sig { returns(T.untyped) }
        attr_reader :kwargs
      end

      class Generic
        # sord omit - no YARD type given for "partial_path:", using untyped
        # sord omit - no YARD type given for "extras:", using untyped
        # sord omit - no YARD type given for "nested:", using untyped
        sig { params(partial_path: T.untyped, extras: T.untyped, nested: T.untyped).void }
        def initialize(partial_path:, extras:, nested:); end

        # sord omit - no YARD return type given, using untyped
        sig { returns(T.untyped) }
        def each_attribute; end

        # This takes advantage of a feature of Rails. If the value of
        # `#to_partial_path` is `my_form_field`, Rails renders
        # `app/views/super/application/_my_form_field.html.erb`, and this
        # instance of Generic is accessible via `my_form_field`
        # 
        # _@return_ — the filename of the partial that will be rendered.
        sig { returns(String) }
        def to_partial_path; end

        # sord omit - no YARD type given for "key", using untyped
        # sord omit - no YARD return type given, using untyped
        sig { params(key: T.untyped).returns(T.untyped) }
        def [](key); end

        # sord omit - no YARD return type given, using untyped
        sig { returns(T.untyped) }
        def reader; end

        # sord omit - no YARD return type given, using untyped
        sig { returns(T.untyped) }
        def label; end

        # sord omit - no YARD type given for "other", using untyped
        # sord omit - no YARD return type given, using untyped
        sig { params(other: T.untyped).returns(T.untyped) }
        def ==(other); end

        # sord omit - no YARD type given for :nested_fields, using untyped
        # Returns the value of attribute nested_fields.
        sig { returns(T.untyped) }
        attr_reader :nested_fields

        # sord omit - no YARD type given for :extras, using untyped
        # Returns the value of attribute extras.
        sig { returns(T.untyped) }
        attr_reader :extras
      end
    end

    module InlineErrors
      # sord omit - no YARD type given for "model_instance", using untyped
      # sord omit - no YARD type given for "column_or_association", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(model_instance: T.untyped, column_or_association: T.untyped).returns(T.untyped) }
      def error_messages(model_instance, column_or_association); end

      # sord omit - no YARD type given for "model_instance", using untyped
      # sord omit - no YARD type given for "column_or_association", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(model_instance: T.untyped, column_or_association: T.untyped).returns(T.untyped) }
      def self.error_messages(model_instance, column_or_association); end

      # sord omit - no YARD type given for "model_instance", using untyped
      # sord omit - no YARD type given for "column_or_association", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(model_instance: T.untyped, column_or_association: T.untyped).returns(T.untyped) }
      def errable_fields(model_instance, column_or_association); end

      # sord omit - no YARD type given for "model_instance", using untyped
      # sord omit - no YARD type given for "column_or_association", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(model_instance: T.untyped, column_or_association: T.untyped).returns(T.untyped) }
      def self.errable_fields(model_instance, column_or_association); end
    end

    class StrongParams
      # sord omit - no YARD type given for "form_schema", using untyped
      sig { params(form_schema: T.untyped).void }
      def initialize(form_schema); end

      # sord omit - no YARD type given for "model", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(model: T.untyped).returns(T.untyped) }
      def require(model); end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def permit; end

      # sord omit - no YARD type given for "responds_to_each_attribute", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(responds_to_each_attribute: T.untyped).returns(T.untyped) }
      def unfurl(responds_to_each_attribute); end
    end

    # Holds a recording of a form field definition
    class FieldTranscript
      sig { void }
      def initialize; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def super; end

      sig { returns(T::Boolean) }
      def super?; end

      # sord omit - no YARD type given for "new_method_name", using untyped
      # sord omit - no YARD type given for "*args", using untyped
      # sord omit - no YARD type given for "**kwargs", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(new_method_name: T.untyped, args: T.untyped, kwargs: T.untyped).returns(T.untyped) }
      def method_missing(new_method_name, *args, **kwargs); end

      # sord omit - no YARD type given for :method_name, using untyped
      # Returns the value of attribute method_name.
      sig { returns(T.untyped) }
      attr_reader :method_name

      # sord omit - no YARD type given for :args, using untyped
      # Returns the value of attribute args.
      sig { returns(T.untyped) }
      attr_reader :args

      # sord omit - no YARD type given for :kwargs, using untyped
      # Returns the value of attribute kwargs.
      sig { returns(T.untyped) }
      attr_reader :kwargs
    end
  end

  # Links have three required attributes that are passed directly into Rails'
  # `link_to` helper
  class Link
    # sord omit - no YARD type given for "*links", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(links: T.untyped).returns(T.untyped) }
    def self.find_all(*links); end

    # sord omit - no YARD type given for "link", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(link: T.untyped).returns(T.untyped) }
    def self.find(link); end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def self.registry; end

    # sord omit - no YARD type given for "*parts_tail", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(parts_tail: T.untyped).returns(T.untyped) }
    def self.polymorphic_parts(*parts_tail); end

    # sord omit - no YARD type given for "text", using untyped
    # sord omit - no YARD type given for "href", using untyped
    # sord omit - no YARD type given for "**options", using untyped
    # The first argument should be the text of the link. If it's an array,
    # it'll send it directly into `I18n.t`
    sig { params(text: T.untyped, href: T.untyped, options: T.untyped).void }
    def initialize(text, href, **options); end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def text; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def href; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def to_partial_path; end

    # sord omit - no YARD type given for "other", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(other: T.untyped).returns(T.untyped) }
    def ==(other); end

    # sord omit - no YARD type given for :options, using untyped
    # Returns the value of attribute options.
    sig { returns(T.untyped) }
    attr_reader :options
  end

  module Sort
    class FormObject
      DIRECTIONS = T.let(["asc", "desc"], T.untyped)

      # sord omit - no YARD type given for "model:", using untyped
      # sord omit - no YARD type given for "params:", using untyped
      # sord omit - no YARD type given for "default:", using untyped
      # sord omit - no YARD type given for "sortable_columns:", using untyped
      sig do
        params(
          model: T.untyped,
          params: T.untyped,
          default: T.untyped,
          sortable_columns: T.untyped
        ).void
      end
      def initialize(model:, params:, default:, sortable_columns:); end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def to_partial_path; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def exprs; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def new_expr; end

      sig { returns(T::Boolean) }
      def persisted?; end

      # sord omit - no YARD type given for "query", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(query: T.untyped).returns(T.untyped) }
      def apply_changes(query); end

      # sord omit - no YARD return type given, using untyped
      # Stringifies the values
      sig { returns(T.untyped) }
      def sanitized_expr_params; end

      # sord omit - no YARD return type given, using untyped
      # Symbolizes the keys
      sig { returns(T.untyped) }
      def normalized_expr_params; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def default_as_query; end

      # sord omit - no YARD type given for :sortable_columns, using untyped
      # Returns the value of attribute sortable_columns.
      sig { returns(T.untyped) }
      attr_reader :sortable_columns

      class Expression
        # sord omit - no YARD type given for "a:", using untyped
        # sord omit - no YARD type given for "d:", using untyped
        sig { params(a: T.untyped, d: T.untyped).void }
        def initialize(a:, d:); end

        # sord omit - no YARD type given for "index", using untyped
        # sord omit - no YARD return type given, using untyped
        sig { params(index: T.untyped).returns(T.untyped) }
        def with_index(index); end

        # sord omit - no YARD return type given, using untyped
        # This is for `fields_for` to work
        sig { returns(T.untyped) }
        def id; end

        sig { returns(T::Boolean) }
        def persisted?; end

        # sord omit - no YARD type given for :a, using untyped
        # attribute
        sig { returns(T.untyped) }
        attr_accessor :a

        # sord omit - no YARD type given for :d, using untyped
        # direction
        sig { returns(T.untyped) }
        attr_accessor :d
      end
    end
  end

  class Badge
    STYLES = T.let({
  light: "bg-gray-100 text-black",
  dark: "bg-gray-900 text-white",
  red: "bg-red-700 text-white",
  yellow: "bg-yellow-400 text-black",
  green: "bg-green-700 text-white",
  blue: "bg-blue-700 text-white",
  purple: "bg-purple-800 text-white",
}, T.untyped)
    COMMON_STYLES = T.let(%w[rounded px-2 py-1 text-xs leading-none font-bold], T.untyped)

    # sord omit - no YARD type given for "text", using untyped
    # sord omit - no YARD type given for "style:", using untyped
    sig { params(text: T.untyped, style: T.untyped).void }
    def initialize(text, style:); end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def styles; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def to_s; end

    # sord omit - no YARD type given for :requested_styles, using untyped
    # Returns the value of attribute requested_styles.
    sig { returns(T.untyped) }
    attr_reader :requested_styles
  end

  class Cheat
    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def controller; end
  end

  # A container class for all internal errors thrown by this library
  # 
  # See also `Super::ClientError`
  class Error < StandardError
    # Error raised when some configuration is not set
    class UnconfiguredConfiguration < Super::Error
    end

    # Error raised when a configuration is set to a invalid value
    class InvalidConfiguration < Super::Error
    end

    # Error raised on problematic plugins, see `Super::Plugin`
    class InvalidPluginArgument < Super::Error
    end

    # Error raised on problematic ActionInquirer settings, see `Super::ActionInquirer`
    class ActionInquirerError < Super::Error
    end

    # Error raised when a `Super::Link` couldn't be found
    class LinkNotRegistered < Super::Error
    end

    # Error raised when rendering if `@view` wasn't set by the controller
    class NothingToRender < Super::Error
      # sord omit - no YARD type given for "basename", using untyped
      sig { params(basename: T.untyped).void }
      def initialize(basename); end
    end

    # Error raised when something wasn't initialized correctly, and if there isn't
    # a more specific error
    class Initialization < Super::Error
    end

    class ArgumentError < Super::Error
    end

    class AlreadyRegistered < Super::Error
    end

    class AlreadyTranscribed < Super::Error
    end

    class NotImplementedError < Super::Error
    end

    class IncompleteBuilder < Super::Error
    end

    class Enum < Super::Error
      class ImpossibleValue < Super::Error::Enum
      end

      class ArgumentError < Super::Error::Enum
      end

      class UndefinedCase < Super::Error::Enum
      end
    end

    class ReorderableHash < Super::Error
      class DuplicateKey < Super::Error::ReorderableHash
      end

      class KeyError < Super::Error::ReorderableHash
      end
    end

    class ViewChain < Super::Error
      class ChainAlreadyStarted < Super::Error::ViewChain
      end
    end
  end

  class Panel
    include Super::Partial::Resolving

    # sord omit - no YARD type given for "*parts", using untyped
    sig { params(parts: T.untyped).void }
    def initialize(*parts); end

    # sord omit - no YARD type given for "template", using untyped
    # sord omit - no YARD type given for "block", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(template: T.untyped, block: T.untyped).returns(T.untyped) }
    def resolve(template, block); end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def resolved_parts; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def to_partial_path; end

    # sord omit - no YARD type given for "template", using untyped
    # sord omit - no YARD type given for "partials", using untyped
    # sord omit - no YARD type given for "block", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(template: T.untyped, partials: T.untyped, block: T.untyped).returns(T.untyped) }
    def resolve_for_rendering(template, partials, block); end

    # sord omit - no YARD type given for :parts, using untyped
    # Returns the value of attribute parts.
    sig { returns(T.untyped) }
    attr_reader :parts
  end

  class Query
    # sord omit - no YARD type given for "model:", using untyped
    # sord omit - no YARD type given for "params:", using untyped
    # sord omit - no YARD type given for "current_path:", using untyped
    sig { params(model: T.untyped, params: T.untyped, current_path: T.untyped).void }
    def initialize(model:, params:, current_path:); end

    # sord omit - no YARD type given for "klass", using untyped
    # sord omit - no YARD type given for "namespace:", using untyped
    # sord omit - no YARD type given for "**additional_initialization_arguments", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(klass: T.untyped, namespace: T.untyped, additional_initialization_arguments: T.untyped).returns(T.untyped) }
    def build(klass, namespace:, **additional_initialization_arguments); end

    # sord omit - no YARD type given for "query_form_object", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(query_form_object: T.untyped).returns(T.untyped) }
    def namespace_for(query_form_object); end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def form_options; end

    # sord omit - no YARD type given for "records", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(records: T.untyped).returns(T.untyped) }
    def apply_changes(records); end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def to_partial_path; end

    # sord omit - no YARD type given for :addons, using untyped
    # Returns the value of attribute addons.
    sig { returns(T.untyped) }
    attr_reader :addons

    # sord omit - no YARD type given for :model, using untyped
    # Returns the value of attribute model.
    sig { returns(T.untyped) }
    attr_reader :model

    # sord omit - no YARD type given for :params, using untyped
    # Returns the value of attribute params.
    sig { returns(T.untyped) }
    attr_reader :params

    # sord omit - no YARD type given for :path, using untyped
    # Returns the value of attribute path.
    sig { returns(T.untyped) }
    attr_reader :path

    # sord omit - no YARD type given for :backwards_addons, using untyped
    # Returns the value of attribute backwards_addons.
    sig { returns(T.untyped) }
    attr_reader :backwards_addons
  end

  module Reset
    extend ActiveSupport::Concern
    KEEP = T.let({
  # Defined by Rails
  _layout: true,
  _generate_paths_by_default: true,

  # Defined in Super::SubstructureController
  page_title: true,

  # Defined in Super::ApplicationController
  current_action: true,
  with_current_action: true,

  # Keep all of the ones in Super::SitewideController
}, T.untyped)
  end

  # Utilities for determining whether to use Sprockets or Webpacker
  class Assets
    # sord omit - no YARD type given for "path", using untyped
    # sord omit - no YARD type given for "**arguments", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(path: T.untyped, arguments: T.untyped).returns(T.untyped) }
    def self.webpacker(path, **arguments); end

    # sord omit - no YARD type given for "path", using untyped
    # sord omit - no YARD type given for "**arguments", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(path: T.untyped, arguments: T.untyped).returns(T.untyped) }
    def self.sprockets(path, **arguments); end

    # sord omit - no YARD type given for "path", using untyped
    # sord omit - no YARD type given for "**arguments", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(path: T.untyped, arguments: T.untyped).returns(T.untyped) }
    def self.auto(path, **arguments); end

    # sord omit - no YARD type given for "assets", using untyped
    # sord omit - no YARD type given for "grep:", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(assets: T.untyped, grep: T.untyped).returns(T.untyped) }
    def self.use_webpacker(assets, grep: nil); end

    # sord omit - no YARD type given for "assets", using untyped
    # sord omit - no YARD type given for "grep:", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(assets: T.untyped, grep: T.untyped).returns(T.untyped) }
    def self.use_sprockets(assets, grep: nil); end

    # sord omit - no YARD type given for "gem_name", using untyped
    # sord omit - no YARD type given for "package_name", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(gem_name: T.untyped, package_name: T.untyped).returns(T.untyped) }
    def self.dist(gem_name, package_name); end

    class Asset
      # sord omit - no YARD type given for "handler:", using untyped
      # sord omit - no YARD type given for "path:", using untyped
      # sord omit - no YARD type given for "arguments:", using untyped
      sig { params(handler: T.untyped, path: T.untyped, arguments: T.untyped).void }
      def initialize(handler:, path:, arguments:); end

      # sord omit - no YARD type given for "other", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(other: T.untyped).returns(T.untyped) }
      def ==(other); end

      # sord omit - no YARD type given for "other", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(other: T.untyped).returns(T.untyped) }
      def ===(other); end

      # Returns the value of attribute handler.
      sig { returns(T.untyped) }
      attr_accessor :handler

      # sord omit - no YARD type given for :path, using untyped
      # Returns the value of attribute path.
      sig { returns(T.untyped) }
      attr_reader :path

      # sord omit - no YARD type given for :arguments, using untyped
      # Returns the value of attribute arguments.
      sig { returns(T.untyped) }
      attr_reader :arguments
    end

    class Handler
      sig { returns(Super::Assets::Handler) }
      def self.auto; end

      sig { returns(T::Boolean) }
      def self.sprockets_available?; end

      # sord omit - no YARD type given for "gem_name", using untyped
      # sord warn - Gem::Specification wasn't able to be resolved to a constant in this project
      sig { params(gem_name: T.untyped).returns(T.nilable(Gem::Specification)) }
      def self.gem_specification(gem_name); end

      sig { returns(Super::Assets::Handler) }
      def self.sprockets; end

      sig { returns(Super::Assets::Handler) }
      def self.webpacker; end

      sig { returns(Super::Assets::Handler) }
      def self.none; end

      # _@param_ `asset_handler`
      sig { params(asset_handler: Symbol).void }
      def initialize(asset_handler); end

      # sord omit - no YARD type given for "other", using untyped
      sig { params(other: T.untyped).returns(T::Boolean) }
      def ==(other); end

      sig { returns(T::Boolean) }
      def sprockets?; end

      sig { returns(T::Boolean) }
      def webpacker?; end

      sig { returns(T::Boolean) }
      def none?; end

      sig { returns(Symbol) }
      def to_sym; end

      sig { returns(String) }
      def to_s; end
    end
  end

  class Filter
    sig { void }
    def initialize; end

    # sord omit - no YARD type given for :fields, using untyped
    # Returns the value of attribute fields.
    sig { returns(T.untyped) }
    attr_reader :fields

    class Guesser
      # sord omit - no YARD type given for "model:", using untyped
      # sord omit - no YARD type given for "fields:", using untyped
      # sord omit - no YARD type given for "type:", using untyped
      sig { params(model: T.untyped, fields: T.untyped, type: T.untyped).void }
      def initialize(model:, fields:, type:); end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def call; end

      # sord omit - no YARD type given for "attribute_name", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(attribute_name: T.untyped).returns(T.untyped) }
      def attribute_type_for(attribute_name); end
    end

    class Operator
      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def self.registry; end

      # sord omit - no YARD type given for "key", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(key: T.untyped).returns(T.untyped) }
      def self.[](key); end

      # sord omit - no YARD type given for "identifier", using untyped
      # sord omit - no YARD type given for "operator", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(identifier: T.untyped, operator: T.untyped).returns(T.untyped) }
      def self.register(identifier, operator); end

      # sord omit - no YARD type given for "identifier", using untyped
      # sord omit - no YARD type given for "display", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(identifier: T.untyped, display: T.untyped, block: T.untyped).returns(T.untyped) }
      def self.define(identifier, display, &block); end

      # sord omit - no YARD type given for "identifier", using untyped
      # sord omit - no YARD type given for "display", using untyped
      sig { params(identifier: T.untyped, display: T.untyped, behavior: T.untyped).void }
      def initialize(identifier, display, &behavior); end

      # sord omit - no YARD type given for "behavior", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(behavior: T.untyped).returns(T.untyped) }
      def behavior=(behavior); end

      # sord omit - no YARD return type given, using untyped
      sig { params(block: T.untyped).returns(T.untyped) }
      def behavior(&block); end

      # sord omit - no YARD type given for :identifier, using untyped
      # Returns the value of attribute identifier.
      sig { returns(T.untyped) }
      attr_reader :identifier

      # sord omit - no YARD type given for :query_parameter_keys, using untyped
      # Returns the value of attribute query_parameter_keys.
      sig { returns(T.untyped) }
      attr_reader :query_parameter_keys

      # sord omit - no YARD type given for :humanized_operator_name, using untyped
      # Returns the value of attribute humanized_operator_name.
      sig { returns(T.untyped) }
      attr_reader :humanized_operator_name
    end

    class FormObject
      # sord omit - no YARD type given for "model:", using untyped
      # sord omit - no YARD type given for "params:", using untyped
      # sord omit - no YARD type given for "schema:", using untyped
      sig { params(model: T.untyped, params: T.untyped, schema: T.untyped).void }
      def initialize(model:, params:, schema:); end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def each_attribute; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def to_partial_path; end

      # sord omit - no YARD type given for "relation", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(relation: T.untyped).returns(T.untyped) }
      def apply_changes(relation); end

      class AttributeForm
        # sord omit - no YARD type given for "model:", using untyped
        # sord omit - no YARD type given for "field_name:", using untyped
        # sord omit - no YARD type given for "operators:", using untyped
        # sord omit - no YARD type given for "params:", using untyped
        sig do
          params(
            model: T.untyped,
            field_name: T.untyped,
            operators: T.untyped,
            params: T.untyped
          ).void
        end
        def initialize(model:, field_name:, operators:, params:); end

        # sord omit - no YARD return type given, using untyped
        sig { returns(T.untyped) }
        def each_operator; end

        # sord omit - no YARD return type given, using untyped
        sig { returns(T.untyped) }
        def humanized_attribute_name; end

        # sord omit - no YARD type given for :model, using untyped
        # Returns the value of attribute model.
        sig { returns(T.untyped) }
        attr_reader :model

        # sord omit - no YARD type given for :field_name, using untyped
        # Returns the value of attribute field_name.
        sig { returns(T.untyped) }
        attr_reader :field_name

        # sord omit - no YARD type given for :operators, using untyped
        # Returns the value of attribute operators.
        sig { returns(T.untyped) }
        attr_reader :operators

        # sord omit - no YARD type given for :params, using untyped
        # Returns the value of attribute params.
        sig { returns(T.untyped) }
        attr_reader :params
      end

      class OperatorForm
        NULLARY = T.let(:_apply, T.untyped)

        # sord omit - no YARD type given for "operator:", using untyped
        # sord omit - no YARD type given for "params:", using untyped
        sig { params(operator: T.untyped, params: T.untyped).void }
        def initialize(operator:, params:); end

        sig { returns(T::Boolean) }
        def specified?; end

        # sord omit - no YARD return type given, using untyped
        sig { returns(T.untyped) }
        def identifier; end

        # sord omit - no YARD return type given, using untyped
        sig { returns(T.untyped) }
        def each_field; end

        # sord omit - no YARD type given for :operator, using untyped
        # Returns the value of attribute operator.
        sig { returns(T.untyped) }
        attr_reader :operator

        # sord omit - no YARD type given for :specified_values, using untyped
        # Returns the value of attribute specified_values.
        sig { returns(T.untyped) }
        attr_reader :specified_values
      end
    end

    # Note: The constants under "Defined Under Namespace" are considered
    # private.
    class SchemaTypes
      # sord omit - no YARD type given for "*identifiers", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(identifiers: T.untyped).returns(T.untyped) }
      def use(*identifiers); end

      # sord omit - no YARD type given for "collection", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(collection: T.untyped).returns(T.untyped) }
      def select(collection); end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def text; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def timestamp; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def boolean; end

      class OperatorList
        include Enumerable

        # sord omit - no YARD type given for "*new_operators", using untyped
        sig { params(new_operators: T.untyped).void }
        def initialize(*new_operators); end

        # sord omit - no YARD type given for "*new_operators", using untyped
        # sord omit - no YARD return type given, using untyped
        sig { params(new_operators: T.untyped).returns(T.untyped) }
        def push(*new_operators); end

        # sord omit - no YARD return type given, using untyped
        sig { params(block: T.untyped).returns(T.untyped) }
        def each(&block); end

        # sord omit - no YARD type given for "operator_identifier", using untyped
        # sord omit - no YARD return type given, using untyped
        sig { params(operator_identifier: T.untyped).returns(T.untyped) }
        def transcribe(operator_identifier = nil); end
      end

      class OperatorWithFieldTranscript
        # sord omit - no YARD type given for "operator", using untyped
        # sord omit - no YARD type given for "field_transcript", using untyped
        sig { params(operator: T.untyped, field_transcript: T.untyped).void }
        def initialize(operator, field_transcript); end

        # sord omit - no YARD type given for :field_transcript, using untyped
        # Returns the value of attribute field_transcript.
        sig { returns(T.untyped) }
        attr_reader :field_transcript
      end
    end
  end

  class Layout
    include Super::Partial::Resolving

    # sord omit - no YARD type given for "header:", using untyped
    # sord omit - no YARD type given for "aside:", using untyped
    # sord omit - no YARD type given for "main:", using untyped
    # sord omit - no YARD type given for "footer:", using untyped
    sig do
      params(
        header: T.untyped,
        aside: T.untyped,
        main: T.untyped,
        footer: T.untyped
      ).void
    end
    def initialize(header: nil, aside: nil, main: nil, footer: nil); end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def to_partial_path; end

    # sord omit - no YARD type given for "template", using untyped
    # sord omit - no YARD type given for "partials", using untyped
    # sord omit - no YARD type given for "block", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(template: T.untyped, partials: T.untyped, block: T.untyped).returns(T.untyped) }
    def resolve_for_rendering(template, partials, block); end

    # sord omit - no YARD type given for :header, using untyped
    # Returns the value of attribute header.
    sig { returns(T.untyped) }
    attr_reader :header

    # sord omit - no YARD type given for :aside, using untyped
    # Returns the value of attribute aside.
    sig { returns(T.untyped) }
    attr_reader :aside

    # sord omit - no YARD type given for :main, using untyped
    # Returns the value of attribute main.
    sig { returns(T.untyped) }
    attr_reader :main

    # sord omit - no YARD type given for :footer, using untyped
    # Returns the value of attribute footer.
    sig { returns(T.untyped) }
    attr_reader :footer
  end

  module Plugin
    class Registry
      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def self.controller; end

      sig { void }
      def initialize; end

      # sord omit - no YARD type given for "include:", using untyped
      # sord omit - no YARD type given for "prepend:", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(include: T.untyped, prepend: T.untyped).returns(T.untyped) }
      def use(include: nil, prepend: nil); end

      # sord omit - no YARD type given for "*before", using untyped
      # sord omit - no YARD type given for "include:", using untyped
      # sord omit - no YARD type given for "prepend:", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(before: T.untyped, include: T.untyped, prepend: T.untyped).returns(T.untyped) }
      def insert_before(*before, include: nil, prepend: nil); end

      # sord omit - no YARD type given for "*after", using untyped
      # sord omit - no YARD type given for "include:", using untyped
      # sord omit - no YARD type given for "prepend:", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(after: T.untyped, include: T.untyped, prepend: T.untyped).returns(T.untyped) }
      def insert_after(*after, include: nil, prepend: nil); end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def classes_ordered; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def ordered; end

      # sord omit - no YARD type given for "include:", using untyped
      # sord omit - no YARD type given for "prepend:", using untyped
      # sord omit - no YARD type given for "before:", using untyped
      # sord omit - no YARD type given for "after:", using untyped
      # sord omit - no YARD return type given, using untyped
      sig do
        params(
          include: T.untyped,
          prepend: T.untyped,
          before: T.untyped,
          after: T.untyped
        ).returns(T.untyped)
      end
      def register(include:, prepend:, before: [], after: []); end
    end
  end

  # The Schema is a general purpose container for describing the "schema"
  # for various purposes. It primarily exists to provide a cohesive user-facing
  # API for defining schemas.
  # 
  # The various "schema types" are likely of more interest
  class Schema
    # This class can be thought of as a Hash, where the keys usually refer to
    # the model's column name and the value refers to the column type. Note
    # though that this isn't always the case—different `SchemaTypes` can do
    # whatever makes sense in their context
    class Fields
      include Enumerable

      # sord omit - no YARD type given for "transform_value_on_set:", using untyped
      sig { params(transform_value_on_set: T.untyped).void }
      def initialize(transform_value_on_set: nil); end

      # sord omit - no YARD type given for "key", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(key: T.untyped).returns(T.untyped) }
      def [](key); end

      # sord omit - no YARD type given for "key", using untyped
      # sord omit - no YARD type given for "value", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(key: T.untyped, value: T.untyped).returns(T.untyped) }
      def []=(key, value); end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def keys; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def values; end

      # sord omit - no YARD return type given, using untyped
      sig { params(block: T.untyped).returns(T.untyped) }
      def each(&block); end

      # sord omit - no YARD type given for "key", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(key: T.untyped).returns(T.untyped) }
      def delete(key); end

      # sord omit - no YARD type given for "other", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(other: T.untyped).returns(T.untyped) }
      def replace(other); end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def to_h; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def nested; end
    end

    module Common
      include Kernel

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def each_attribute_name; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def each_attribute; end
    end

    class Guesser
      # sord omit - no YARD type given for "model:", using untyped
      # sord omit - no YARD type given for "fields:", using untyped
      # sord omit - no YARD type given for "type:", using untyped
      sig { params(model: T.untyped, fields: T.untyped, type: T.untyped).void }
      def initialize(model:, fields:, type:); end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def limit; end

      # sord omit - no YARD return type given, using untyped
      sig { params(block: T.untyped).returns(T.untyped) }
      def reject(&block); end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def ignore_foreign_keys; end

      # sord omit - no YARD return type given, using untyped
      sig { params(block: T.untyped).returns(T.untyped) }
      def assign_type(&block); end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def call; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def sorted_attribute_names; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def sort_weight; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def is_foreign_key; end
    end
  end

  # This schema type is meant to be used for +#index+ or +#show+ actions to
  # transform database fields into something that is human friendly.
  # 
  # ```
  # class MembersController::Controls
  #   # ...
  # 
  #   def show_schema
  #     Super::Display.new do |fields, type|
  #       fields[:name] = type.manual { |name| name }
  #       fields[:rank] = type.manual { |rank| rank }
  #       fields[:position] = type.manual { |position| position }
  #       fields[:ship] = type.manual { |ship| "#{ship.name} (Ship ##{ship.id})" }
  #       fields[:created_at] = type.manual { |created_at| created_at.iso8601 }
  #       fields[:updated_at] = type.manual { |updated_at| updated_at.iso8601 }
  #     end
  #   end
  # 
  #   # ...
  # end
  # ```
  class Display
    include Super::Schema::Common

    sig { void }
    def initialize; end

    # sord omit - no YARD type given for "action:", using untyped
    # sord omit - no YARD type given for "format:", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(action: T.untyped, format: T.untyped).returns(T.untyped) }
    def apply(action:, format:); end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def to_partial_path; end

    # sord omit - no YARD type given for "template:", using untyped
    # sord omit - no YARD type given for "record:", using untyped
    # sord omit - no YARD type given for "column:", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(template: T.untyped, record: T.untyped, column: T.untyped).returns(T.untyped) }
    def render_attribute(template:, record:, column:); end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def each_attribute_name; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def each_attribute; end

    class Guesser
      # sord omit - no YARD type given for "model:", using untyped
      # sord omit - no YARD type given for "action:", using untyped
      # sord omit - no YARD type given for "fields:", using untyped
      # sord omit - no YARD type given for "type:", using untyped
      sig do
        params(
          model: T.untyped,
          action: T.untyped,
          fields: T.untyped,
          type: T.untyped
        ).void
      end
      def initialize(model:, action:, fields:, type:); end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def call; end

      # sord omit - no YARD type given for "attribute_name", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(attribute_name: T.untyped).returns(T.untyped) }
      def attribute_type_for(attribute_name); end
    end

    class SchemaTypes
      TYPES = T.let(Useful::Enum.new(:attribute, :record, :none), T.untyped)

      # sord omit - no YARD type given for "fields:", using untyped
      sig { params(fields: T.untyped).void }
      def initialize(fields:); end

      # sord omit - no YARD type given for "type", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(type: T.untyped, transform_block: T.untyped).returns(T.untyped) }
      def real(type = :attribute, &transform_block); end

      # sord omit - no YARD type given for "type", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(type: T.untyped, transform_block: T.untyped).returns(T.untyped) }
      def computed(type = :attribute, &transform_block); end

      # sord omit - no YARD return type given, using untyped
      sig { params(transform_block: T.untyped).returns(T.untyped) }
      def manual(&transform_block); end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def batch; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def string; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def timestamp; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def time; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def rich_text; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def actions; end

      sig { returns(T::Boolean) }
      def actions_called?; end

      class Builder
        extend Super::Useful::Builder

        # sord omit - no YARD return type given, using untyped
        sig { returns(T.untyped) }
        def build; end

        # sord omit - no YARD type given for "method_name", using untyped
        # sord omit - no YARD return type given, using untyped
        sig { params(method_name: T.untyped).returns(T.untyped) }
        def self.builder(method_name); end

        # sord omit - no YARD type given for "method_name", using untyped
        # sord omit - no YARD return type given, using untyped
        sig { params(method_name: T.untyped).returns(T.untyped) }
        def self.builder_with_block(method_name); end
      end

      class Built
        # sord omit - no YARD type given for "real:", using untyped
        # sord omit - no YARD type given for "type:", using untyped
        # sord omit - no YARD type given for "ignore_nil:", using untyped
        # sord omit - no YARD type given for "attribute_name:", using untyped
        sig do
          params(
            real: T.untyped,
            type: T.untyped,
            ignore_nil: T.untyped,
            attribute_name: T.untyped,
            transform_block: T.untyped
          ).void
        end
        def initialize(real:, type:, ignore_nil:, attribute_name:, &transform_block); end

        sig { returns(T::Boolean) }
        def real?; end

        # sord omit - no YARD type given for "attribute_name", using untyped
        # sord omit - no YARD type given for "value", using untyped
        # sord omit - no YARD return type given, using untyped
        sig { params(attribute_name: T.untyped, value: T.untyped).returns(T.untyped) }
        def present(attribute_name, value = nil); end

        # sord omit - no YARD type given for :type, using untyped
        # Returns the value of attribute type.
        sig { returns(T.untyped) }
        attr_reader :type

        # sord omit - no YARD type given for :attribute_name, using untyped
        # Returns the value of attribute attribute_name.
        sig { returns(T.untyped) }
        attr_reader :attribute_name
      end
    end
  end

  class Partial
    # sord omit - no YARD type given for "partialish", using untyped
    # sord omit - no YARD type given for "template:", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(partialish: T.untyped, template: T.untyped).returns(T.untyped) }
    def self.render(partialish, template:); end

    # sord omit - no YARD type given for "path", using untyped
    # sord omit - no YARD type given for "locals:", using untyped
    sig { params(path: T.untyped, locals: T.untyped).void }
    def initialize(path, locals: {}); end

    # sord omit - no YARD type given for :to_partial_path, using untyped
    # Returns the value of attribute to_partial_path.
    sig { returns(T.untyped) }
    attr_reader :to_partial_path

    # sord omit - no YARD type given for :locals, using untyped
    # Returns the value of attribute locals.
    sig { returns(T.untyped) }
    attr_reader :locals

    module Resolving
      # sord omit - no YARD type given for "template", using untyped
      # sord omit - no YARD type given for "partials", using untyped
      # sord omit - no YARD type given for "block", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(template: T.untyped, partials: T.untyped, block: T.untyped).returns(T.untyped) }
      def resolve_for_rendering(template, partials, block); end

      # sord omit - no YARD type given for "template", using untyped
      # sord omit - no YARD type given for "partials", using untyped
      # sord omit - no YARD type given for "block", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(template: T.untyped, partials: T.untyped, block: T.untyped).returns(T.untyped) }
      def self.resolve_for_rendering(template, partials, block); end
    end
  end

  # Configures the host Rails app to work with Super
  class Railtie < Rails::Engine
  end

  class Navigation
    ALL = T.let(Object.new, T.untyped)
    REST = T.let(Object.new, T.untyped)

    sig { void }
    def initialize; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def definition; end

    # sord omit - no YARD return type given, using untyped
    # _@param_ `definition`
    # 
    # _@param_ `unused_links`
    sig { params(definition: T::Array[T.any(Super::Navigation::Menu, Super::Link)], unused_links: T::Hash[String, T::Boolean]).returns(T.untyped) }
    def validate_and_determine_explicit_links(definition, unused_links); end

    # sord omit - no YARD type given for "defs", using untyped
    # sord omit - no YARD type given for "all_hrefs", using untyped
    # sord omit - no YARD type given for "rest_hrefs", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(defs: T.untyped, all_hrefs: T.untyped, rest_hrefs: T.untyped).returns(T.untyped) }
    def expand_directives(defs, all_hrefs, rest_hrefs); end

    # sord omit - no YARD type given for "hrefs", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(hrefs: T.untyped).returns(T.untyped) }
    def linkify_hrefs(hrefs); end

    # @!attribute [rw] title
    #   @return [String]
    # 
    # @!attribute [rw] links
    #   @return [Array<Super::Navigation::Menu, Super::Link>]
    class Menu < Struct
      sig { returns(String) }
      attr_accessor :title

      sig { returns(T::Array[T.any(Super::Navigation::Menu, Super::Link)]) }
      attr_accessor :links
    end

    class Builder
      sig { void }
      def initialize; end

      sig { returns(T::Array[T.any(Super::Navigation::Menu, Super::Link)]) }
      def build; end

      # sord omit - no YARD type given for "model", using untyped
      # sord omit - no YARD type given for "**kwargs", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(model: T.untyped, kwargs: T.untyped).returns(T.untyped) }
      def link(model, **kwargs); end

      # sord omit - no YARD type given for "*args", using untyped
      # sord omit - no YARD type given for "**kwargs", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(args: T.untyped, kwargs: T.untyped).returns(T.untyped) }
      def link_to(*args, **kwargs); end

      # sord omit - no YARD type given for "title", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(title: T.untyped).returns(T.untyped) }
      def menu(title); end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def rest; end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def all; end
    end

    class RouteFormatterButReallySearcher
      # sord omit - no YARD type given for "route_namespace:", using untyped
      sig { params(route_namespace: T.untyped).void }
      def initialize(route_namespace: Super.configuration.path); end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def matches; end

      # sord omit - no YARD type given for "routes", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(routes: T.untyped).returns(T.untyped) }
      def section(routes); end

      # sord omit - no YARD type given for "routes", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(routes: T.untyped).returns(T.untyped) }
      def header(routes); end

      # sord omit - no YARD type given for "routes", using untyped
      # sord omit - no YARD type given for "filter", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(routes: T.untyped, filter: T.untyped).returns(T.untyped) }
      def no_routes(routes, filter); end

      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def result; end

      # sord omit - no YARD type given for "title", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(title: T.untyped).returns(T.untyped) }
      def section_title(title); end
    end
  end

  class Pagination
    include Enumerable

    # sord omit - no YARD type given for "total_count:", using untyped
    # sord omit - no YARD type given for "limit:", using untyped
    # sord omit - no YARD type given for "query_params:", using untyped
    # sord omit - no YARD type given for "page_query_param:", using untyped
    sig do
      params(
        total_count: T.untyped,
        limit: T.untyped,
        query_params: T.untyped,
        page_query_param: T.untyped
      ).void
    end
    def initialize(total_count:, limit:, query_params:, page_query_param:); end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def offset; end

    sig { returns(T::Boolean) }
    def necessary?; end

    # sord omit - no YARD return type given, using untyped
    sig { params(block: T.untyped).returns(T.untyped) }
    def each(&block); end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def to_partial_path; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def pages; end

    # sord omit - no YARD type given for :current_pageno, using untyped
    # Returns the value of attribute current_pageno.
    sig { returns(T.untyped) }
    attr_accessor :current_pageno

    # sord omit - no YARD type given for :limit, using untyped
    # Returns the value of attribute limit.
    sig { returns(T.untyped) }
    attr_reader :limit

    module ControllerMethods
      # sord omit - no YARD return type given, using untyped
      sig { returns(T.untyped) }
      def index; end
    end
  end

  module Useful
    module I19
      include Kernel

      # sord omit - no YARD type given for "prefix", using untyped
      # sord omit - no YARD type given for "optional", using untyped
      # sord omit - no YARD type given for "suffix", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(prefix: T.untyped, optional: T.untyped, suffix: T.untyped).returns(T.untyped) }
      def build_chain(prefix, optional, suffix); end

      # sord omit - no YARD type given for "prefix", using untyped
      # sord omit - no YARD type given for "optional", using untyped
      # sord omit - no YARD type given for "suffix", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(prefix: T.untyped, optional: T.untyped, suffix: T.untyped).returns(T.untyped) }
      def self.build_chain(prefix, optional, suffix); end

      # sord omit - no YARD type given for "chain", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(chain: T.untyped).returns(T.untyped) }
      def chain_to_i18n(chain); end

      # sord omit - no YARD type given for "chain", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(chain: T.untyped).returns(T.untyped) }
      def self.chain_to_i18n(chain); end

      # sord omit - no YARD type given for "prefix", using untyped
      # sord omit - no YARD type given for "optional", using untyped
      # sord omit - no YARD type given for "suffix", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(prefix: T.untyped, optional: T.untyped, suffix: T.untyped).returns(T.untyped) }
      def i18n_with_fallback(prefix, optional, suffix); end

      # sord omit - no YARD type given for "prefix", using untyped
      # sord omit - no YARD type given for "optional", using untyped
      # sord omit - no YARD type given for "suffix", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(prefix: T.untyped, optional: T.untyped, suffix: T.untyped).returns(T.untyped) }
      def self.i18n_with_fallback(prefix, optional, suffix); end
    end

    class Enum
      # sord omit - no YARD type given for "*choices", using untyped
      sig { params(choices: T.untyped).void }
      def initialize(*choices); end

      # sord omit - no YARD type given for "chosen", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(chosen: T.untyped).returns(T.untyped) }
      def case(chosen); end

      class Case
        # sord omit - no YARD type given for "choices", using untyped
        # sord omit - no YARD type given for "chosen", using untyped
        sig { params(choices: T.untyped, chosen: T.untyped).void }
        def initialize(choices, chosen); end

        # sord omit - no YARD type given for "*keys", using untyped
        # sord omit - no YARD return type given, using untyped
        sig { params(keys: T.untyped, block: T.untyped).returns(T.untyped) }
        def when(*keys, &block); end

        # sord omit - no YARD return type given, using untyped
        sig { returns(T.untyped) }
        def result; end

        sig { returns(T::Boolean) }
        def matching_possibilities_and_checks?; end
      end
    end

    module Builder
      include Kernel

      # sord omit - no YARD type given for "method_name", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(method_name: T.untyped).returns(T.untyped) }
      def builder(method_name); end

      # sord omit - no YARD type given for "method_name", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(method_name: T.untyped).returns(T.untyped) }
      def builder_with_block(method_name); end
    end

    class Deprecation
      VERSIONS = T.let({
}, T.untyped)

      # sord omit - no YARD type given for "version", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(version: T.untyped).returns(T.untyped) }
      def self.[](version); end
    end
  end

  class ViewChain
    # sord omit - no YARD type given for "chain", using untyped
    sig { params(chain: T.untyped).void }
    def initialize(chain); end

    # sord omit - no YARD type given for "*args", using untyped
    # sord omit - no YARD type given for "**kwargs", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(args: T.untyped, kwargs: T.untyped).returns(T.untyped) }
    def insert(*args, **kwargs); end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def to_partial_path; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def shift; end

    sig { returns(T::Boolean) }
    def empty?; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def chain; end
  end

  module ViewHelper
    include Kernel

    # sord omit - no YARD type given for "*list", using untyped
    # sord omit - no YARD return type given, using untyped
    # For example, calling `classes("always", ["sometimes", condition])` would
    # return the string "always sometimes" or "always"
    sig { params(list: T.untyped).returns(T.untyped) }
    def classes(*list); end

    # sord omit - no YARD type given for "*list", using untyped
    # sord omit - no YARD return type given, using untyped
    # For example, calling `classes("always", ["sometimes", condition])` would
    # return the string "always sometimes" or "always"
    sig { params(list: T.untyped).returns(T.untyped) }
    def self.classes(*list); end
  end

  # A container class for all user-facing (4xx) errors thrown by this library.
  # 
  # See also `Super::Error`
  class ClientError < StandardError
    class BadRequest < Super::ClientError
    end

    class Unauthorized < Super::ClientError
    end

    class Forbidden < Super::ClientError
    end

    class NotFound < Super::ClientError
    end

    class UnprocessableEntity < Super::ClientError
    end

    module Handling
      extend ActiveSupport::Concern
    end
  end

  # Example
  # 
  # ```ruby
  # super_form_for([:admin, @member]) do |f|
  #   # the long way
  #   f.super.label :name
  #   f.super.text_field :name
  #   f.super.inline_errors :name
  # 
  #   # the short way (slightly different from the long way, for alignment)
  #   f.super.text_field! :position
  # end
  # ```
  # 
  # Refer to the Rails docs:
  # https://api.rubyonrails.org/classes/ActionView/Helpers/FormBuilder.html
  class FormBuilder < ActionView::Helpers::FormBuilder
    FIELD_ERROR_PROC = T.let(proc { |html_tag, instance| html_tag }, T.untyped)
    FORM_BUILDER_DEFAULTS = T.let({ builder: self }.freeze, T.untyped)

    # sord omit - no YARD type given for "**options", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(options: T.untyped).returns(T.untyped) }
    def super(**options); end

    class Wrappers
      # sord omit - no YARD type given for "builder", using untyped
      # sord omit - no YARD type given for "template", using untyped
      sig { params(builder: T.untyped, template: T.untyped).void }
      def initialize(builder, template); end

      # sord omit - no YARD type given for "attribute", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(attribute: T.untyped).returns(T.untyped) }
      def inline_errors(attribute); end

      # sord omit - no YARD return type given, using untyped
      sig { params(block: T.untyped).returns(T.untyped) }
      def container(&block); end

      # sord omit - no YARD type given for "method_name", using untyped
      # sord omit - no YARD type given for "**optionals", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(method_name: T.untyped, optionals: T.untyped).returns(T.untyped) }
      def self.define_with_label_tag(method_name, **optionals); end

      # sord omit - no YARD type given for "method_name", using untyped
      # sord omit - no YARD type given for "*args", using untyped
      # sord omit - no YARD type given for "**kwargs", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(method_name: T.untyped, args: T.untyped, kwargs: T.untyped).returns(T.untyped) }
      def self.define_convenience(method_name, *args, **kwargs); end

      # sord omit - no YARD type given for "options", using untyped
      # sord omit - no YARD type given for "**internal_defaults", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(options: T.untyped, internal_defaults: T.untyped).returns(T.untyped) }
      def split_defaults(options, **internal_defaults); end

      # sord omit - no YARD type given for "*class_lists", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(class_lists: T.untyped).returns(T.untyped) }
      def join_classes(*class_lists); end

      # sord omit - no YARD type given for "content", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(content: T.untyped).returns(T.untyped) }
      def error_content_tag(content); end

      # sord omit - no YARD type given for "*parts", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(parts: T.untyped).returns(T.untyped) }
      def compact_join(*parts); end

      # sord omit - no YARD type given for "attribute", using untyped
      # sord omit - no YARD type given for "text", using untyped
      # sord omit - no YARD type given for "options", using untyped
      # sord omit - no YARD return type given, using untyped
      sig do
        params(
          attribute: T.untyped,
          text: T.untyped,
          options: T.untyped,
          block: T.untyped
        ).returns(T.untyped)
      end
      def label(attribute, text = nil, options = {}, &block); end

      # sord omit - no YARD type given for "attribute", using untyped
      # sord omit - no YARD type given for "options", using untyped
      # sord omit - no YARD type given for "checked_value", using untyped
      # sord omit - no YARD type given for "unchecked_value", using untyped
      # sord omit - no YARD return type given, using untyped
      sig do
        params(
          attribute: T.untyped,
          options: T.untyped,
          checked_value: T.untyped,
          unchecked_value: T.untyped
        ).returns(T.untyped)
      end
      def check_box(attribute, options = {}, checked_value = "1", unchecked_value = "0"); end

      # sord omit - no YARD type given for "attribute", using untyped
      # sord omit - no YARD type given for "checked_value:", using untyped
      # sord omit - no YARD type given for "unchecked_value:", using untyped
      # sord omit - no YARD type given for "label_text:", using untyped
      # sord omit - no YARD type given for "label:", using untyped
      # sord omit - no YARD type given for "field:", using untyped
      # sord omit - no YARD type given for "show_errors:", using untyped
      # sord omit - no YARD return type given, using untyped
      sig do
        params(
          attribute: T.untyped,
          checked_value: T.untyped,
          unchecked_value: T.untyped,
          label_text: T.untyped,
          label: T.untyped,
          field: T.untyped,
          show_errors: T.untyped
        ).returns(T.untyped)
      end
      def check_box!(attribute, checked_value: "1", unchecked_value: "0", label_text: nil, label: {}, field: {}, show_errors: true); end

      # sord omit - no YARD type given for "attribute", using untyped
      # sord omit - no YARD type given for "options", using untyped
      # sord omit - no YARD return type given, using untyped
      # def file_field!(attribute, label_text: nil, label: {}, field: {}, show_errors: true)
      # end
      sig { params(attribute: T.untyped, options: T.untyped).returns(T.untyped) }
      def hidden_field(attribute, options = {}); end

      # sord omit - no YARD type given for "value", using untyped
      # sord omit - no YARD type given for "options", using untyped
      # sord omit - no YARD return type given, using untyped
      # def radio_button(attribute, tag_value, label_text: nil, label: {}, field: {}, show_errors: true)
      # end
      sig { params(value: T.untyped, options: T.untyped).returns(T.untyped) }
      def submit(value = nil, options = {}); end

      # sord omit - no YARD type given for "attribute", using untyped
      # sord omit - no YARD type given for "choices", using untyped
      # sord omit - no YARD type given for "options", using untyped
      # sord omit - no YARD type given for "html_options", using untyped
      # sord omit - no YARD return type given, using untyped
      sig do
        params(
          attribute: T.untyped,
          choices: T.untyped,
          options: T.untyped,
          html_options: T.untyped,
          block: T.untyped
        ).returns(T.untyped)
      end
      def select(attribute, choices, options = {}, html_options = {}, &block); end

      # sord omit - no YARD type given for "attribute", using untyped
      # sord omit - no YARD type given for "collection", using untyped
      # sord omit - no YARD type given for "value_method", using untyped
      # sord omit - no YARD type given for "text_method", using untyped
      # sord omit - no YARD type given for "options", using untyped
      # sord omit - no YARD type given for "html_options", using untyped
      # sord omit - no YARD return type given, using untyped
      sig do
        params(
          attribute: T.untyped,
          collection: T.untyped,
          value_method: T.untyped,
          text_method: T.untyped,
          options: T.untyped,
          html_options: T.untyped
        ).returns(T.untyped)
      end
      def collection_select(attribute, collection, value_method, text_method, options = {}, html_options = {}); end

      # sord omit - no YARD type given for "attribute", using untyped
      # sord omit - no YARD type given for "collection", using untyped
      # sord omit - no YARD type given for "group_method", using untyped
      # sord omit - no YARD type given for "group_label_method", using untyped
      # sord omit - no YARD type given for "option_key_method", using untyped
      # sord omit - no YARD type given for "option_value_method", using untyped
      # sord omit - no YARD type given for "options", using untyped
      # sord omit - no YARD type given for "html_options", using untyped
      # sord omit - no YARD return type given, using untyped
      sig do
        params(
          attribute: T.untyped,
          collection: T.untyped,
          group_method: T.untyped,
          group_label_method: T.untyped,
          option_key_method: T.untyped,
          option_value_method: T.untyped,
          options: T.untyped,
          html_options: T.untyped
        ).returns(T.untyped)
      end
      def grouped_collection_select(attribute, collection, group_method, group_label_method, option_key_method, option_value_method, options = {}, html_options = {}); end

      # sord omit - no YARD type given for "attribute", using untyped
      # sord omit - no YARD type given for "priority_zones", using untyped
      # sord omit - no YARD type given for "options", using untyped
      # sord omit - no YARD type given for "html_options", using untyped
      # sord omit - no YARD return type given, using untyped
      sig do
        params(
          attribute: T.untyped,
          priority_zones: T.untyped,
          options: T.untyped,
          html_options: T.untyped
        ).returns(T.untyped)
      end
      def time_zone_select(attribute, priority_zones = nil, options = {}, html_options = {}); end

      # sord omit - no YARD type given for "attribute", using untyped
      # sord omit - no YARD type given for "collection", using untyped
      # sord omit - no YARD type given for "value_method", using untyped
      # sord omit - no YARD type given for "text_method", using untyped
      # sord omit - no YARD type given for "options", using untyped
      # sord omit - no YARD type given for "html_options", using untyped
      # sord omit - no YARD return type given, using untyped
      sig do
        params(
          attribute: T.untyped,
          collection: T.untyped,
          value_method: T.untyped,
          text_method: T.untyped,
          options: T.untyped,
          html_options: T.untyped,
          block: T.untyped
        ).returns(T.untyped)
      end
      def collection_check_boxes(attribute, collection, value_method, text_method, options = {}, html_options = {}, &block); end

      # sord omit - no YARD type given for "attribute", using untyped
      # sord omit - no YARD type given for "collection", using untyped
      # sord omit - no YARD type given for "value_method", using untyped
      # sord omit - no YARD type given for "text_method", using untyped
      # sord omit - no YARD type given for "options", using untyped
      # sord omit - no YARD type given for "html_options", using untyped
      # sord omit - no YARD return type given, using untyped
      sig do
        params(
          attribute: T.untyped,
          collection: T.untyped,
          value_method: T.untyped,
          text_method: T.untyped,
          options: T.untyped,
          html_options: T.untyped,
          block: T.untyped
        ).returns(T.untyped)
      end
      def collection_radio_buttons(attribute, collection, value_method, text_method, options = {}, html_options = {}, &block); end

      # sord omit - no YARD type given for "attribute", using untyped
      # sord omit - no YARD type given for "options", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(attribute: T.untyped, options: T.untyped).returns(T.untyped) }
      def date_flatpickr(attribute, options = {}); end

      # sord omit - no YARD type given for "attribute", using untyped
      # sord omit - no YARD type given for "options", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(attribute: T.untyped, options: T.untyped).returns(T.untyped) }
      def datetime_flatpickr(attribute, options = {}); end

      # sord omit - no YARD type given for "attribute", using untyped
      # sord omit - no YARD type given for "options", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(attribute: T.untyped, options: T.untyped).returns(T.untyped) }
      def time_flatpickr(attribute, options = {}); end

      # sord omit - no YARD type given for "attribute", using untyped
      # sord omit - no YARD type given for "options", using untyped
      # sord omit - no YARD return type given, using untyped
      sig { params(attribute: T.untyped, options: T.untyped).returns(T.untyped) }
      def rich_text_area(attribute, options = {}); end
    end
  end

  class LinkBuilder
    sig { params(block: T.untyped).returns(Super::LinkBuilder) }
    def text(&block); end

    sig { params(block: T.untyped).returns(Super::LinkBuilder) }
    def process_text(&block); end

    sig { params(block: T.untyped).returns(Super::LinkBuilder) }
    def href(&block); end

    sig { params(block: T.untyped).returns(Super::LinkBuilder) }
    def process_href(&block); end

    sig { params(block: T.untyped).returns(Super::LinkBuilder) }
    def options(&block); end

    sig { params(block: T.untyped).returns(Super::LinkBuilder) }
    def process_options(&block); end

    # sord omit - no YARD type given for "**kwargs", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(kwargs: T.untyped).returns(T.untyped) }
    def resolve(**kwargs); end
  end

  module Compatability
    # sord omit - no YARD type given for "field", using untyped
    # sord omit - no YARD return type given, using untyped
    # Rails 5.1 and after lets you find field errors using either a string or a
    # symbol.
    sig { params(field: T.untyped).returns(T.untyped) }
    def errable_fields(field); end

    # sord omit - no YARD type given for "field", using untyped
    # sord omit - no YARD return type given, using untyped
    # Rails 5.1 and after lets you find field errors using either a string or a
    # symbol.
    sig { params(field: T.untyped).returns(T.untyped) }
    def self.errable_fields(field); end

    # sord omit - no YARD type given for "query", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(query: T.untyped).returns(T.untyped) }
    def sanitize_sql_like(query); end

    # sord omit - no YARD type given for "query", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(query: T.untyped).returns(T.untyped) }
    def self.sanitize_sql_like(query); end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def polymorphic_path_container; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def self.polymorphic_path_container; end
  end

  # Allows setting global configuration
  # 
  # ```ruby
  # Super.configuration do |c|
  #   c.title = "My Admin Site"
  # end
  # ```
  class Configuration
    include ActiveSupport::Configurable

    sig { void }
    def initialize; end

    sig { returns(Super::Plugin::Registry) }
    def controller_plugins; end

    sig { returns(String) }
    attr_accessor :title

    sig { returns(String) }
    attr_accessor :index_records_per_page

    sig { returns(T::Array[Super::Assets::Asset]) }
    attr_accessor :javascripts

    sig { returns(T::Array[Super::Assets::Asset]) }
    attr_accessor :stylesheets

    sig { returns(String) }
    attr_accessor :path

    sig { returns(String) }
    attr_accessor :generator_module

    sig { returns(String) }
    attr_accessor :generator_as
  end

  class PackagedAsset
    VERSION_BEGINNING = T.let(/\A\d+\.\d+.\d+/.freeze, T.untyped)

    class << self
      # Returns the value of attribute warning_message.
      sig { returns(T.untyped) }
      attr_accessor :warning_message
    end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def self.comparable_super_version; end

    # sord omit - no YARD type given for "package_json_path", using untyped
    sig { params(package_json_path: T.untyped).returns(T::Boolean) }
    def self.version_matches_gem?(package_json_path); end

    # sord omit - no YARD type given for "package_json_path", using untyped
    sig { params(package_json_path: T.untyped).void }
    def initialize(package_json_path); end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def full_version; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def comparable_version; end
  end

  # ```ruby
  # action = Super::ActionInquirer.new(
  #   Super::ActionInquirer.default_for_resources,
  #   :index
  # )
  # 
  # action.read? # => true
  # action.index? # => true
  # action.show? # => false
  # action.write? # => false
  # ```
  class ActionInquirer
    # _@return_ — default settings for initialization
    sig { returns(T::Hash[Symbol, T::Array[Symbol]]) }
    def self.default_for_resources; end

    sig { returns(ActionInquirer) }
    def self.index!; end

    sig { returns(ActionInquirer) }
    def self.show!; end

    sig { returns(ActionInquirer) }
    def self.new!; end

    sig { returns(ActionInquirer) }
    def self.edit!; end

    sig { returns(ActionInquirer) }
    def self.create!; end

    sig { returns(ActionInquirer) }
    def self.update!; end

    sig { returns(ActionInquirer) }
    def self.destroy!; end

    # sord omit - no YARD type given for "categories_and_their_actions", using untyped
    # sord omit - no YARD type given for "action", using untyped
    sig { params(categories_and_their_actions: T.untyped, action: T.untyped).void }
    def initialize(categories_and_their_actions, action); end

    # sord omit - no YARD type given for "method_name", using untyped
    # sord omit - no YARD type given for "_", using untyped
    sig { params(method_name: T.untyped, _: T.untyped).returns(T::Boolean) }
    def respond_to_missing?(method_name, _); end

    # sord omit - no YARD type given for "method_name", using untyped
    # sord omit - no YARD type given for "*_args", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(method_name: T.untyped, _args: T.untyped).returns(T.untyped) }
    def method_missing(method_name, *_args); end

    # sord omit - no YARD type given for "method_name", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(method_name: T.untyped).returns(T.untyped) }
    def parse_inquiry(method_name); end

    # sord omit - no YARD type given for "inquiry", using untyped
    sig { params(inquiry: T.untyped).returns(T::Boolean) }
    def matches_action?(inquiry); end

    # sord omit - no YARD type given for "inquiry", using untyped
    sig { params(inquiry: T.untyped).returns(T::Boolean) }
    def matches_category?(inquiry); end

    # sord omit - no YARD type given for :action, using untyped
    # Returns the value of attribute action.
    sig { returns(T.untyped) }
    attr_accessor :action
  end

  class ReorderableHash
    include TSort
    include Enumerable
    UNDEFINED = T.let(BasicObject.new, T.untyped)

    # sord omit - no YARD type given for "data", using untyped
    sig { params(data: T.untyped).void }
    def initialize(data = {}); end

    # sord omit - no YARD type given for "key", using untyped
    # sord omit - no YARD type given for "value", using untyped
    # sord omit - no YARD type given for "before:", using untyped
    # sord omit - no YARD type given for "after:", using untyped
    # sord omit - no YARD return type given, using untyped
    sig do
      params(
        key: T.untyped,
        value: T.untyped,
        before: T.untyped,
        after: T.untyped
      ).returns(T.untyped)
    end
    def insert(key, value, before: UNDEFINED, after: UNDEFINED); end

    # sord omit - no YARD type given for "key", using untyped
    # sord omit - no YARD type given for "before:", using untyped
    # sord omit - no YARD type given for "after:", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(key: T.untyped, before: T.untyped, after: T.untyped).returns(T.untyped) }
    def order(key, before: UNDEFINED, after: UNDEFINED); end

    # sord omit - no YARD return type given, using untyped
    sig { params(block: T.untyped).returns(T.untyped) }
    def tsort_each_node(&block); end

    # sord omit - no YARD type given for "node", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(node: T.untyped, block: T.untyped).returns(T.untyped) }
    def tsort_each_child(node, &block); end

    # sord omit - no YARD type given for "key", using untyped
    # sord omit - no YARD type given for "where", using untyped
    # sord omit - no YARD type given for "value", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(key: T.untyped, where: T.untyped, value: T.untyped).returns(T.untyped) }
    def []=(key, where, value); end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def keys; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def values; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def to_h; end

    # sord omit - no YARD return type given, using untyped
    sig { params(block: T.untyped).returns(T.untyped) }
    def each(&block); end
  end

  # These are form builder view helpers. They are similar to what Rails ships
  # out of the box but adds some styling and functionality.
  # 
  # These helpers are available both in Super views and in your application's
  # views.
  module FormBuilderHelper
    # sord omit - no YARD type given for "record", using untyped
    # sord omit - no YARD type given for "options", using untyped
    # sord omit - no YARD return type given, using untyped
    # Super's version of `#form_for`
    sig { params(record: T.untyped, options: T.untyped, block: T.untyped).returns(T.untyped) }
    def super_form_for(record, options = {}, &block); end

    # sord omit - no YARD type given for "**options", using untyped
    # sord omit - no YARD return type given, using untyped
    # Super's version of `#form_with`
    sig { params(options: T.untyped, block: T.untyped).returns(T.untyped) }
    def super_form_with(**options, &block); end

    # sord omit - no YARD type given for "*args", using untyped
    # sord omit - no YARD type given for "**options", using untyped
    # sord omit - no YARD return type given, using untyped
    # Super's version of `#fields_for`
    sig { params(args: T.untyped, options: T.untyped, block: T.untyped).returns(T.untyped) }
    def super_fields_for(*args, **options, &block); end
  end

  # These methods define what each resourceful Super admin page looks like.
  # Generally, the return value of each of these methods should be set to
  # `@view`.
  class ViewController < Super::SitewideController
    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def index_view; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def show_view; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def new_view; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def edit_view; end
  end

  # Various methods that are useful for all Super admin controllers, regardless
  # of the controller being a resourceful or non-resourceful.
  class SitewideController < ActionController::Base
    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def document_title_segments; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def document_title_separator; end
  end

  # Provides a default implementation for each of the resourceful actions
  class ApplicationController < Super::SubstructureController
    include Super::ClientError::Handling

    # sord omit - no YARD return type given, using untyped
    # Displays a list of records to the user
    sig { returns(T.untyped) }
    def index; end

    # sord omit - no YARD return type given, using untyped
    # Displays a specific record to the user
    sig { returns(T.untyped) }
    def show; end

    # sord omit - no YARD return type given, using untyped
    # Displays a form to allow the user to create a new record
    sig { returns(T.untyped) }
    def new; end

    # sord omit - no YARD return type given, using untyped
    # Creates a record, or shows the validation errors
    sig { returns(T.untyped) }
    def create; end

    # sord omit - no YARD return type given, using untyped
    # Displays a form to allow the user to update an existing record
    sig { returns(T.untyped) }
    def edit; end

    # sord omit - no YARD return type given, using untyped
    # Updates a record, or shows validation errors
    sig { returns(T.untyped) }
    def update; end

    # sord omit - no YARD return type given, using untyped
    # Deletes a record, or shows validation errors
    sig { returns(T.untyped) }
    def destroy; end

    # sord omit - no YARD type given for "action", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(action: T.untyped).returns(T.untyped) }
    def with_current_action(action); end
  end

  # Various methods that determine the behavior of your controllers. These
  # methods can and should be overridden.
  class SubstructureController < Super::ViewController
    # sord omit - no YARD type given for "action_name", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(action_name: T.untyped).returns(T.untyped) }
    def self.batch(action_name); end

    # This is an optional method
    sig { returns(String) }
    def title; end

    # This defines what to set in the <title> tag. It works in conjunction with
    # the `#site_title` method
    sig { returns(T.nilable(String)) }
    def page_title; end

    # sord warn - ActiveRecord::Relation wasn't able to be resolved to a constant in this project
    # Configures what database records are visible on load. This is an optional
    # method, it defaults to "`all`" methods
    sig { returns(ActiveRecord::Relation) }
    def base_scope; end

    # Configures the fields that are displayed on the index and show actions.
    # This is a required method
    sig { returns(Super::Display) }
    def display_schema; end

    # Configures the editable fields on the new and edit actions. This is a
    # required method
    sig { returns(Super::Form) }
    def form_schema; end

    # sord warn - ActionController::Parameters wasn't able to be resolved to a constant in this project
    # Configures which parameters could be written to the database. This is a
    # required method
    sig { returns(ActionController::Parameters) }
    def permitted_params; end

    # Configures the actions linked to on the index page. This is an optional
    # method
    sig { returns(T::Array[Super::Link]) }
    def collection_actions; end

    # sord warn - ActiveRecord::Base wasn't able to be resolved to a constant in this project
    # Configures the actions linked to on the show page as well as each row of
    # the table on the index page. This is an optional method
    # 
    # Favor the `record` argument over the `@record` instance variable;
    # `@record` won't always be set, notably on the index page where it's
    # called on every row
    # 
    # _@param_ `record`
    sig { params(record: ActiveRecord::Base).returns(T::Array[Super::Link]) }
    def member_actions(record); end

    # sord warn - ActiveRecord::Relation wasn't able to be resolved to a constant in this project
    # Specifies how many records to show per page
    sig { returns(ActiveRecord::Relation) }
    def records_per_page; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def load_records; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def load_record; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def build_record; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def set_record_attributes; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def save_record; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def destroy_record; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def redirect_to_record; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def redirect_to_records; end

    # sord omit - no YARD type given for "error", using untyped
    # sord omit - no YARD return type given, using untyped
    sig { params(error: T.untyped).returns(T.untyped) }
    def redirect_to_record_with_destroy_failure_message(error = nil); end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def render_new_as_bad_request; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def render_edit_as_bad_request; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def apply_queries; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def initialize_filter_form; end

    # sord omit - no YARD return type given, using untyped
    sig { returns(T.untyped) }
    def initialize_sort_form; end

    sig { returns(T::Boolean) }
    def pagination_enabled?; end

    # Sets up pagination
    sig { returns(Pagination) }
    def initialize_pagination; end

    # sord warn - ActiveRecord::Relation wasn't able to be resolved to a constant in this project
    # Paginates
    sig { returns(ActiveRecord::Relation) }
    def paginate_records; end
  end
end
