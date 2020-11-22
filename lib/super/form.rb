module Super
  class Form
    module FieldErrorProc
      def error_wrapping(html_tag)
        if Thread.current[:super_form_builder]
          return html_tag
        end

        super
      end
    end

    class Builder < ActionView::Helpers::FormBuilder
      # These methods were originally defined in the following files
      #
      # * actionview/lib/action_view/helpers/form_helper.rb
      # * actionview/lib/action_view/helpers/form_options_helper.rb
      # * actionview/lib/action_view/helpers/date_helper.rb
      %w[
        label text_field password_field hidden_field file_field text_area
        check_box radio_button color_field search_field telephone_field
        date_field time_field datetime_field month_field week_field url_field
        email_field number_field range_field

        select collection_select grouped_collection_select time_zone_select
        collection_radio_buttons collection_check_boxes

        time_select datetime_select date_select
      ].each do |field_type_method|
        class_eval(<<~RUBY, __FILE__, __LINE__ + 1)
          def #{field_type_method}(*)
            Thread.current[:super_form_builder] = true
            super
          ensure
            Thread.current[:super_form_builder] = nil
          end
        RUBY
      end

      alias datetime_local_field datetime_field
      alias phone_field telephone_field
    end
  end
end

ActionView::Helpers::Tags::Base.class_eval do
  prepend Super::Form::FieldErrorProc
end
