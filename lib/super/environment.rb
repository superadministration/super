module Super
  def self.environment
    @environment ||= Environment.new
  end

  class Environment
    def assets_via
      if Gem::Dependency.new("sprockets", "~> 4.0").matching_specs.any?
        :sprockets4
      elsif Gem::Dependency.new("sprockets", "~> 3.0").matching_specs.any?
        :sprockets3
      elsif Gem::Dependency.new("sprockets", "~> 2.0").matching_specs.any?
        :sprockets2
      elsif Gem::Dependency.new("webpacker", "~> 4.0").matching_specs.any?
        :webpacker4
      elsif Gem::Dependency.new("webpacker", "~> 3.0").matching_specs.any?
        :webpacker3
      else
        :none
      end
    end
  end
end
