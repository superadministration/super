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

  validates :name, presence: true
  validates :rank, presence: true
end
