# typed: true
# frozen_string_literal: true

module Super
  class Filter
    # Note: The constants under "Defined Under Namespace" are considered
    # private.
    class SchemaTypes
      class OperatorList
        include Enumerable

        def initialize(*new_operators)
          @operators = {}
          @operator_transcript = {}
          @fallback_transcript = nil

          T.unsafe(self).push(*new_operators)
        end

        def push(*new_operators)
          new_operators.flatten.map(&:dup).each do |new_operator|
            new_identifier = new_operator.identifier.to_s

            raise Error::AlreadyRegistered if @operators.key?(new_identifier)

            @operators[new_identifier] = new_operator
          end

          nil
        end

        alias_method :add, :push

        def each(&block)
          return enum_for(:each) if !block

          @operators.each do |identifier, operator|
            block.call(
              OperatorWithFieldTranscript.new(
                operator,
                @operator_transcript[identifier] || @fallback_transcript
              )
            )
          end
        end

        def transcribe(operator_identifier = nil)
          transcript = Form::FieldTranscript.new
          yield transcript

          if operator_identifier.nil?
            @fallback_transcript = transcript
          else
            @operator_transcript[operator_identifier.to_s] = transcript
          end

          self
        end
      end

      class OperatorWithFieldTranscript
        def initialize(operator, field_transcript)
          @operator = operator
          @field_transcript = field_transcript
        end

        Super::Filter::Operator.instance_methods(false).each do |name|
          delegate name, to: :@operator
        end

        attr_reader :field_transcript
      end

      def use(*identifiers)
        found_operators = identifiers.flatten.map { |id| Operator[id] }
        T.unsafe(OperatorList).new(*found_operators)
      end

      def select(collection)
        use("eq", "null", "nnull")
          .transcribe { |f| f.super.select(collection) }
      end

      def text
        use("contain", "ncontain", "blank", "nblank")
      end

      def timestamp
        use("between", "null", "nnull")
          .transcribe { |f| f.super.datetime_flatpickr }
      end

      def boolean
        use("true", "false", "null", "nnull")
      end
    end
  end
end
