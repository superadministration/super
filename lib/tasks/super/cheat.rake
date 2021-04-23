# frozen_string_literal: true

namespace :super do
  task :cheat do
    require "super/cheat"
    cheat = Super::Cheat.new
    cheat.controls
  end
end
