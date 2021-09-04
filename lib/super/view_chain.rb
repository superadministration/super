# frozen_string_literal: true

module Super
  class ViewChain
    def initialize(chain)
      @data = ReorderableHash.new(chain)
    end

    def chain
      @chain ||= @data.values
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
  end
end
