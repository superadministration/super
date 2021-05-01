# frozen_string_literal: true

module Super
  class Cheat
    def controller
      paths = %w[../../app/controllers/super/substructure_controller.rb]
      methods =
        paths
        .map { |f| File.read(File.expand_path(f, __dir__)) }
        .flat_map { |content| content.scan(/^\s+(?:helper_method )?def .*$/) }
        .map { |method| method.strip.sub(/^(?:helper_method )?def /, "#") }

      puts "== Super::ApplicationController"
      puts methods.join("\n")
    end
  end
end
