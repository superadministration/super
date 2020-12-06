module Super
  # View helpers, available within views
  module ApplicationHelper
    def super_render_partialish(partialish)
      if partialish.respond_to?(:to_partial_path)
        if partialish.is_a?(Super::Partial)
          render(partialish, partialish.locals)
        else
          render(partialish)
        end
      else
        partialish
      end
    end

    def super_format_for_display(schema, record, column)
      formatter = schema.fields[column]

      formatted =
        if formatter.real?
          value = record.public_send(column)
          formatter.present(value)
        else
          formatter.present
        end

      if formatted.respond_to?(:to_partial_path)
        if formatted.respond_to?(:locals)
          formatted.locals[:record] ||= record
          render(formatted, formatted.locals)
        else
          render(formatted)
        end
      else
        formatted
      end
    end
  end
end
