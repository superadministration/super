# typed: strict
# frozen_string_literal: true

module Super
  class Cheat
    extend T::Sig

    sig { void }
    def controller
      paths = %w[
        ../../app/controllers/super/application_controller.rb
        ../../app/controllers/super/view_controller.rb
        ../../app/controllers/super/sitewide_controller.rb
        ../../app/controllers/super/substructure_controller.rb
        ../../app/controllers/super/foundation_controller.rb
      ]
      methods =
        paths
          .map { |f| File.read(File.expand_path(f, __dir__)) }
          .map { |content| content.scan(/^\s+(?:helper_method )?def .*$/) }
          .flatten
          .reject { |method| method =~ /\bdef self\./ }
          .map { |method| method.strip.sub(/^(?:helper_method )?def /, "#") }

      puts "== Super::ApplicationController"
      puts methods.join("\n")
    end
  end
end
