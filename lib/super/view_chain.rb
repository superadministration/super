# typed: true
# frozen_string_literal: true

module Super
  class ViewChain
    def initialize(chain)
      @data = ReorderableHash.new(chain)
    end

    def insert(*args, **kwargs)
      if instance_variable_defined?(:@chain)
        raise Error::ViewChain::ChainAlreadyStarted
      end

      @data.insert(*args, **kwargs)
    end

    def to_partial_path
      "view_chain"
    end

    def shift
      chain.shift
    end

    def empty?
      chain.empty?
    end

    private

    def chain
      @chain ||= @data.to_h
    end
  end
end
