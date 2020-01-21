module Super
  # ```ruby
  # action = Super::ActionInquirer.new(
  #   Super::ActionInquirer.default_resources,
  #   :index
  # )
  #
  # action.read? # => true
  # action.index? # => true
  # action.show? # => false
  # action.write? # => false
  # ```
  class ActionInquirer
    attr_reader :action

    # @return [Hash<Symbol, Array<Symbol>>] default settings for initialization
    #
    def self.default_resources
      {
        read: %i[index show new edit],
        write: %i[create update destroy],
        delete: %i[destroy]
      }
    end

    def initialize(categories_and_their_actions, action)
      @categories = categories_and_their_actions.keys.map(&:to_s)
      @actions = categories_and_their_actions.values.flatten.uniq.map(&:to_s)
      @actions_categories = {}

      categories_and_their_actions.each do |c, actions|
        c = c.to_s

        actions.each do |a|
          a = a.to_s
          @actions_categories[a] ||= []
          @actions_categories[a].push(c)
        end
      end

      intersection = @categories & @actions
      if intersection.any?
        raise Error::ActionInquirerError,
          "Found shared elements between categories and actions: #{intersection.join(", ")}"
      end

      self.action = action
    end

    def action=(new_action)
      new_action = new_action.to_s
      if !@actions.include?(new_action)
        raise Error::ActionInquirerError, "Unknown action: #{new_action}"
      end

      @action = new_action
    end

    def respond_to_missing?(method_name, *)
      inquiry = parse_inquiry(method_name)

      return super if !inquiry

      @actions.include?(inquiry) || @categories.include?(inquiry) || super
    end

    def method_missing(method_name, *)
      inquiry = parse_inquiry(method_name)

      return super if !inquiry

      if @actions.include?(inquiry)
        matches_action?(inquiry)
      elsif @categories.include?(inquiry)
        matches_category?(inquiry)
      else
        super
      end
    end

    private

    def parse_inquiry(method_name)
      inquiry = method_name.to_s

      if inquiry[-1] != "?"
        return nil
      end

      inquiry.chomp("?")
    end

    def matches_action?(inquiry)
      @action == inquiry
    end

    def matches_category?(inquiry)
      @actions_categories[@action].include?(inquiry)
    end
  end
end
