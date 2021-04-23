# frozen_string_literal: true

module Super
  class Cheat
    def controls
      paths = %w[controls.rb controls/optional.rb controls/steps.rb controls/view.rb]
      methods =
        paths
        .map { |f| File.read(File.join(__dir__, f)) }
        .flat_map { |content| content.scan(/^\s+def .*$/) }
        .map { |method| method.strip.sub(/^def /, "#") }

      puts "== Super::Controls"
      puts methods.join("\n")
    end
  end
end
