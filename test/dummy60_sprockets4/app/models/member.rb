class Member < ApplicationRecord
  enum rank: {
    captain: "Captain",
    commander: "Commander",
    lieutenant_commander: "Lieutenant Commander",
    lieutenant: "Lieutenant",
    lieutenant_junior_grade: "Lieutenant Junior Grade",
    ensign: "Ensign",
    nco: "NCO",
  }

  belongs_to :ship
  has_many :favorite_things, dependent: :delete_all

  accepts_nested_attributes_for(
    :favorite_things,
    allow_destroy: true,
    reject_if: -> (record) { record[:name].blank? }
  )

  validates :name, presence: true
  validates :rank, presence: true
end
