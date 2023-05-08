# typed: strict
# frozen_string_literal: true

class Ship < ApplicationRecord
  has_many :members
end
