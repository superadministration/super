<!--
# @title FAQ
-->

# FAQ

## How do I handle authorization?

Assuming you already have authentication set up, it should only require defining
a `Controls#initialize` that accepts an authenticated user. From there, you can
customize `Controls#scope` to have the required behavior.

```ruby
class PostsController < AdminController
  def new_controls
    Controls.new(current_user)
  end

  class Controls < Super::Controls
    def initialize(current_user)
      @current_user = current_user
    end

    def model
      Post
    end

    def scope(action:)
      # Example: admins can read and write; others can only read
      if @current_user.admin?
        return model.all
      end

      if action.read?
        return model.all
      end

      raise Super::ClientError::Forbidden
    end

    # ...
  end
end
```
