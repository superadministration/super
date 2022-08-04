# frozen_string_literal: true

require "tsort"

if !ENV["SUPER_SKIP_REQUIRE_CSV"]
  require "csv"
end

require "rails/engine"

require "super/schema/common"
require "super/useful/builder"
require "super/useful/deprecations"
require "super/useful/enum"
require "super/useful/i19"

require "super/action_inquirer"
require "super/assets"
require "super/badge"
require "super/client_error"
require "super/compatibility"
require "super/configuration"
require "super/display"
require "super/display/guesser"
require "super/display/schema_types"
require "super/error"
require "super/filter"
require "super/filter/form_object"
require "super/filter/guesser"
require "super/filter/operator"
require "super/filter/schema_types"
require "super/form"
require "super/form/field_transcript"
require "super/form/guesser"
require "super/form/inline_errors"
require "super/form/schema_types"
require "super/form/strong_params"
require "super/form_builder"
require "super/form_builder/action_text_methods"
require "super/form_builder/base_methods"
require "super/form_builder/flatpickr_methods"
require "super/form_builder/option_methods"
require "super/form_builder_helper"
require "super/layout"
require "super/link"
require "super/link_builder"
require "super/navigation"
require "super/packaged_asset"
require "super/pagination"
require "super/panel"
require "super/partial"
require "super/plugin"
require "super/query"
require "super/render_helper"
require "super/reorderable_hash"
require "super/reset"
require "super/schema"
require "super/schema/guesser"
require "super/sort"
require "super/version"
require "super/view_chain"
require "super/view_helper"

require "super/railtie"
