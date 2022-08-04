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
      end
    end

    render(*args, **kwargs, &block)
  end
end
