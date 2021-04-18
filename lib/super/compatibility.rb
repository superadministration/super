# frozen_string_literal: true

module Super
  module Compatability
    module_function

    # Rails 5.1 and after lets you find field errors using either a string or a
    # symbol.
    def errable_fields(field)
      if Rails::VERSION::MAJOR == 5 && Rails::VERSION::MINOR == 0
        [field.to_s, field.to_sym]
      else
        field
      end
    end

    def sanitize_sql_like(query)
      if ActiveRecord::VERSION::MAJOR == 4
        ActiveRecord::Base.send(:sanitize_sql_like, query)
      elsif ActiveRecord::VERSION::MAJOR == 5 && ActiveRecord::VERSION::MINOR <= 1
        ActiveRecord::Base.send(:sanitize_sql_like, query)
      else
        ActiveRecord::Base.sanitize_sql_like(query)
      end
    end

    def polymorphic_path_container
      if Rails::VERSION::MAJOR == 5 && Rails::VERSION::MINOR == 0
        @polymorphic_path_container ||=
          begin
            klass = Class.new do
              include ActionDispatch::Routing::PolymorphicRoutes

              def method_missing(method_name)
                Rails.application.routes.url_helpers.public_send(method_name)
              end
            end

            klass.new
          end
      else
        Rails.application.routes.url_helpers
      end
    end
  end
end
