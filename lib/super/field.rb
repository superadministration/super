module Super
  class Field
    def self.display(resource, column, controls, action:)
      value = resource.public_send(column)

      case value
      when String
        value
      when Time, DateTime, Date
        value.iso8601 rescue value.inspect
      else
        value.inspect
      end
    end
  end
end
