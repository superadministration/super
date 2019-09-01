module Super
  # The Schema is a general purpose container for describing the "schema"
  # for various purposes. It primarily exists to provide a cohesive user-facing
  # API for defining schemas.
  #
  # Its inner classes are likely of more interest.
  class Schema
    # @param type_driver [ReadTypes, WriteTypes]
    def initialize(type_driver)
      @type_driver = type_driver
      @fields = {}

      if block_given?
        yield(@fields, @type_driver)
      end
    end

    attr_reader :fields

    def field_keys
      fields.keys
    end
  end
end
