# typed: true
# frozen_string_literal: true

class AddShipToMembers < ActiveRecord::Migration[5.0]
  def change
    add_reference :members, :ship, foreign_key: true
  end
end
