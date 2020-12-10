class FavoriteThing < ApplicationRecord
  belongs_to :member

  validates :name, presence: true

  accepts_nested_attributes_for :member
end
