# typed: true
# frozen_string_literal: true

module Super
  # These are form builder view helpers. They are similar to what Rails ships
  # out of the box but adds some styling and functionality.
  #
  # These helpers are available both in Super views and in your application's
  # views.
  module FormBuilderHelper
    # Super's version of `#form_for`
    def super_form_for(record, options = {}, &block)
      original = ActionView::Base.field_error_proc
      ActionView::Base.field_error_proc = FormBuilder::FIELD_ERROR_PROC

      options[:builder] ||= FormBuilder
      T.let(self, T.untyped).form_for(record, options, &block)
    ensure
      ActionView::Base.field_error_proc = original
    end

    # Super's version of `#form_with`
    def super_form_with(**options, &block)
      original = ActionView::Base.field_error_proc
      ActionView::Base.field_error_proc = FormBuilder::FIELD_ERROR_PROC

      options[:builder] ||= FormBuilder
      T.let(self, T.untyped).form_with(**options, &block)
    ensure
      ActionView::Base.field_error_proc = original
    end

    # Super's version of `#fields_for`
    def super_fields_for(*args, **options, &block)
      original = ActionView::Base.field_error_proc
      ActionView::Base.field_error_proc = FormBuilder::FIELD_ERROR_PROC

      options[:builder] ||= FormBuilder
      T.unsafe(self).fields_for(*args, **options, &block)
    ensure
      ActionView::Base.field_error_proc = original
    end
  end
end
