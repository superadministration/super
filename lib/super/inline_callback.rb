module Super
  module InlineCallback
    extend ActiveSupport::Concern

    included do
      register_inline_callback(:yield, on: :index)
    end

    class_methods do
      def inline_callback_registry
        @inline_callback_registry ||= {}
      end

      def inline_callback_defined?(action)
        action = action.to_sym

        inline_callback_registry.key?(action)
      end

      def inline_callbacks_for(action, check_ancestors = true)
        action = action.to_sym

        inline_callback_registry[action] ||= {}

        if check_ancestors
          ancestors.each do |ancestor|
            if ancestor.respond_to?(:inline_callback_defined?)
              if ancestor.inline_callback_defined?(action)
                parent_class_callbacks = ancestor.inline_callbacks_for(action, false)
                inline_callback_registry[action] = parent_class_callbacks.merge(inline_callback_registry[action])
              end
            end

            if ancestor == Super::ApplicationController
              break
            end
          end
        end

        inline_callback_registry[action]
      end

      def register_inline_callback(callback, on:, after: nil)
        action = on.to_sym
        after = after.to_sym if after.respond_to?(:to_sym)

        callbacks = inline_callbacks_for(action)
        if !callbacks.key?(callback)
          callbacks[callback] = []
        end

        if after
          callbacks[callback].push(after)
        end
      end
    end

    def with_inline_callbacks
      action = params[:action].to_sym

      callbacks = self.class.inline_callbacks_for(action)

      each_node = -> (&b) { callbacks.each_key(&b) }
      each_child = -> (cb, &b) { callbacks[cb].each(&b) }

      yield_called = false

      TSort.tsort_each(each_node, each_child) do |callback|
        if callback == :yield
          yield_called = true
          yield
        else
          send(callback)
        end
      end

      if !yield_called
        yield
      end
    end
  end
end
