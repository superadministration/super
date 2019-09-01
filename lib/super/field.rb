module Super
  class Field
    def self.display(schema, resource, column)
      value = resource.public_send(column)

      schema.fields[column].present(value)
    end
  end
end
