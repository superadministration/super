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

    def handle_super_render(template, local_assigns, &block)
      name, current = shift
      current = template.super_resolve_renderable(current)

      if !current
        Rails.logger.warn do
          "Super::ViewChain encountered a nil view: #{name.inspect}."
        end
      end

      if empty?
        template.super_render(current)
      else
        template.super_render(current) do
          template.concat(template.super_render(self))
        end
      end
    end

    private

    def chain
      @chain ||= @data.to_h
    end
  end
end
