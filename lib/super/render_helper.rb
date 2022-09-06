# frozen_string_literal: true
# typed: false

module Super::RenderHelper
  def super_render(*args, **kwargs, &block)
    if args.size >= 1
      renderable = args.first

      case renderable
      when ActiveSupport::SafeBuffer
        return renderable
      when Super::Partial
        return render(*args, **kwargs, &block)
      when Super::Link
        return renderable.to_link(self, kwargs)
      when Super::ViewChain
        return renderable.handle_super_render(self, kwargs)
      end
    end

    render(*args, **kwargs, &block)
  end

  def super_resolve_renderable(renderable)
    if renderable.kind_of?(Symbol)
      instance_variable_get(renderable)
    else
      renderable
    end
  end
end
