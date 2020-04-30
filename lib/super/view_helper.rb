module Super
  module ViewHelper
    module_function

    def errors_accounting_for_reflections(model_instance, column_or_association)
      errable_fields(model_instance, column_or_association)
        .flat_map { |field| Compatability.rails_50_errable_fields(field) }
        .flat_map { |field| model_instance.errors.full_messages_for(field) }
        .uniq
    end

    def errable_fields(model_instance, column_or_association)
      column_or_association = column_or_association.to_s
      reflection = model_instance.class.reflect_on_association(column_or_association)
      reflection ||= model_instance.class.reflections.values.find { |r| r.foreign_key == column_or_association }

      if reflection
        [reflection.name.to_s, reflection.foreign_key.to_s]
      else
        [column_or_association]
      end
    end
  end
end
