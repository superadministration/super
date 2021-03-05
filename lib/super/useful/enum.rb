# frozen_string_literal: true

module Super
  module Useful
    class Enum
      def initialize(*choices)
        @choices = choices.flatten.map { |choice| [choice, nil] }.to_h
      end

      def case(chosen)
        Case.new(@choices, chosen)
      end

      class Case
        def initialize(choices, chosen)
          if !choices.key?(chosen)
            raise Error::Enum::ImpossibleValue,
              "`#{chosen}` isn't in: #{choices.keys.map(&:inspect).join(", ")}"
          end

          @choices = choices
          @chosen = chosen
          @whens = {}
        end

        def when(*keys, &block)
          if !block_given?
            raise Error::ArgumentError, "must receive block"
          end

          keys.each do |key|
            if !@choices.key?(key)
              raise Error::Enum::ImpossibleValue, "`#{key.inspect}` is not a possibility"
            end

            @whens[key] = block
          end

          self
        end

        def result
          if @choices.size != @whens.size
            missing_keys = @choices.keys - @whens.keys
            raise Error::Enum::UndefinedCase, "Unset cases: #{missing_keys.join(", ")}"
          end

          @whens[@chosen].call(@value)
        end

        private

        def matching_possibilities_and_checks?
          if @whens.size == @choices.size
            return true
          end

          false
        end
      end
    end
  end
end
