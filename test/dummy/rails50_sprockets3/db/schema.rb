# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20210411180249) do

  create_table "favorite_things", force: :cascade do |t|
    t.integer  "member_id",  null: false
    t.text     "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_id"], name: "index_favorite_things_on_member_id"
  end

  create_table "members", force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "rank",       null: false
    t.string   "position"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "ship_id"
    t.index ["ship_id"], name: "index_members_on_ship_id"
  end

  create_table "ships", force: :cascade do |t|
    t.string   "name"
    t.string   "registry"
    t.string   "class_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sinks", force: :cascade do |t|
    t.string   "string_column"
    t.text     "text_column"
    t.integer  "integer_column"
    t.bigint   "bigint_column"
    t.float    "float_column"
    t.decimal  "decimal_column"
    t.decimal  "numeric_column"
    t.datetime "datetime_column"
    t.time     "time_column"
    t.date     "date_column"
    t.binary   "binary_column"
    t.boolean  "boolean_column"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

end
