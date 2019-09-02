module Super
  class Display
    def self.format(schema, resource, column)
      value = resource.public_send(column)

      schema.fields[column].present(value)
    end
  end
end
