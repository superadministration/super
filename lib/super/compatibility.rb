module Super
  module Compatability
    module_function

    def rails_50_errable_fields(field)
      if Rails::VERSION::MAJOR == 5 && Rails::VERSION::MINOR == 0
        [field.to_s, field.to_sym]
      else
        field
      end
    end
  end
end
