# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20140308075148) do

  create_table "account_details", force: true do |t|
    t.string   "company_name"
    t.string   "business_type"
    t.string   "main_contact"
    t.string   "business_phone"
    t.string   "business_fax"
    t.string   "business_hours"
    t.integer  "account_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "account_details", ["account_id"], name: "index_account_details_on_account_id", using: :btree

  create_table "accounts", force: true do |t|
    t.string   "account_type"
    t.integer  "users_count"
    t.integer  "locations_count"
    t.integer  "items_count"
    t.integer  "parts_count"
    t.integer  "warranties_count"
    t.boolean  "business_account"
    t.integer  "reminders_count"
    t.integer  "extended_warranties_count"
    t.boolean  "business_profile"
    t.integer  "user_vendors_count"
    t.integer  "service_records_count"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "addresses", force: true do |t|
    t.integer  "location_id"
    t.string   "street"
    t.string   "city"
    t.integer  "state_id"
    t.string   "zipcode"
    t.float    "latitude"
    t.float    "longitude"
    t.integer  "account_detail_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "addresses", ["account_detail_id"], name: "index_addresses_on_account_detail_id", using: :btree
  add_index "addresses", ["location_id"], name: "index_addresses_on_location_id", using: :btree
  add_index "addresses", ["state_id"], name: "index_addresses_on_state_id", using: :btree

  create_table "extended_warranties", force: true do |t|
    t.date     "parts_exp"
    t.date     "labor_exp"
    t.text     "terms"
    t.integer  "part_id"
    t.integer  "item_id"
    t.integer  "location_id"
    t.integer  "account_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "extended_warranty_start_date"
    t.datetime "extended_warranty_end_date"
    t.string   "extended_warranty_provider"
  end

  add_index "extended_warranties", ["account_id"], name: "index_extended_warranties_on_account_id", using: :btree
  add_index "extended_warranties", ["item_id"], name: "index_extended_warranties_on_item_id", using: :btree
  add_index "extended_warranties", ["location_id"], name: "index_extended_warranties_on_location_id", using: :btree
  add_index "extended_warranties", ["part_id"], name: "index_extended_warranties_on_part_id", using: :btree

  create_table "feature_categories", force: true do |t|
    t.string   "feature_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "features", force: true do |t|
    t.string   "title"
    t.text     "content"
    t.boolean  "internal"
    t.boolean  "external"
    t.integer  "feature_category_id"
    t.integer  "list_order"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "features", ["feature_category_id"], name: "index_features_on_feature_category_id", using: :btree

  create_table "frequencies", force: true do |t|
    t.string   "interval"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "items", force: true do |t|
    t.string   "name"
    t.string   "serial_number"
    t.string   "make"
    t.string   "model"
    t.date     "purchase_date"
    t.integer  "original_cost",                default: 0
    t.integer  "account_id"
    t.integer  "location_id"
    t.string   "notes"
    t.integer  "parts_count",                  default: 0
    t.integer  "warranties_count",             default: 0
    t.string   "purchased_from"
    t.integer  "extended_warranties_count",    default: 0
    t.integer  "reminders_count",              default: 0
    t.integer  "user_vendor_id"
    t.integer  "vendor_id"
    t.integer  "service_records_count",        default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "removal_date"
    t.integer  "estimated_weight"
    t.integer  "refrigerant_removal_quantity", default: 0
    t.integer  "scrap_value"
    t.text     "capitalization_reason"
    t.string   "physical_location"
    t.string   "removal_vendor"
    t.boolean  "is_capitalized"
  end

  add_index "items", ["account_id"], name: "index_items_on_account_id", using: :btree
  add_index "items", ["location_id"], name: "index_items_on_location_id", using: :btree
  add_index "items", ["user_vendor_id"], name: "index_items_on_user_vendor_id", using: :btree
  add_index "items", ["vendor_id"], name: "index_items_on_vendor_id", using: :btree

  create_table "location_roles", force: true do |t|
    t.integer  "user_id"
    t.integer  "location_id"
    t.boolean  "location_admin"
    t.boolean  "location_access"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "location_roles", ["location_id"], name: "index_location_roles_on_location_id", using: :btree
  add_index "location_roles", ["user_id"], name: "index_location_roles_on_user_id", using: :btree

  create_table "locations", force: true do |t|
    t.string   "name"
    t.string   "location_number"
    t.integer  "account_id"
    t.integer  "items_count",               default: 0
    t.integer  "parts_count",               default: 0
    t.integer  "warranties_count",          default: 0
    t.integer  "extended_warranties_count", default: 0
    t.integer  "reminders_count",           default: 0
    t.integer  "user_vendors_count",        default: 0
    t.integer  "service_records_count",     default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "locations", ["account_id"], name: "index_locations_on_account_id", using: :btree

  create_table "message_assets", force: true do |t|
    t.string   "name"
    t.integer  "message_id"
    t.integer  "message_update_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "message_assignments", force: true do |t|
    t.integer  "message_id"
    t.integer  "user_id"
    t.integer  "vendor_id"
    t.boolean  "message_read"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "message_assignments", ["message_id"], name: "index_message_assignments_on_message_id", using: :btree
  add_index "message_assignments", ["user_id"], name: "index_message_assignments_on_user_id", using: :btree
  add_index "message_assignments", ["vendor_id"], name: "index_message_assignments_on_vendor_id", using: :btree

  create_table "message_owners", force: true do |t|
    t.integer  "message_id"
    t.integer  "user_id"
    t.integer  "vendor_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "message_owners", ["message_id"], name: "index_message_owners_on_message_id", using: :btree
  add_index "message_owners", ["user_id"], name: "index_message_owners_on_user_id", using: :btree
  add_index "message_owners", ["vendor_id"], name: "index_message_owners_on_vendor_id", using: :btree

  create_table "message_priorities", force: true do |t|
    t.string   "priority_name"
    t.string   "priority_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "message_statuses", force: true do |t|
    t.string   "status_name"
    t.string   "status_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "message_updates", force: true do |t|
    t.integer  "message_id"
    t.integer  "user_id"
    t.integer  "vendor_id"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "message_updates", ["message_id"], name: "index_message_updates_on_message_id", using: :btree
  add_index "message_updates", ["user_id"], name: "index_message_updates_on_user_id", using: :btree
  add_index "message_updates", ["vendor_id"], name: "index_message_updates_on_vendor_id", using: :btree

  create_table "messages", force: true do |t|
    t.string   "title"
    t.text     "content"
    t.integer  "message_status_id"
    t.integer  "message_priority_id"
    t.date     "due_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "messages", ["message_priority_id"], name: "index_messages_on_message_priority_id", using: :btree
  add_index "messages", ["message_status_id"], name: "index_messages_on_message_status_id", using: :btree

  create_table "parts", force: true do |t|
    t.string   "vendor_name"
    t.string   "name"
    t.string   "model_number"
    t.string   "make"
    t.text     "description"
    t.date     "replacement_date"
    t.integer  "item_id"
    t.integer  "account_id"
    t.integer  "location_id"
    t.integer  "warranties_count"
    t.integer  "extended_warranties_count"
    t.integer  "service_records_count"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "parts", ["account_id"], name: "index_parts_on_account_id", using: :btree
  add_index "parts", ["item_id"], name: "index_parts_on_item_id", using: :btree
  add_index "parts", ["location_id"], name: "index_parts_on_location_id", using: :btree

  create_table "reminders", force: true do |t|
    t.integer  "item_id"
    t.integer  "location_id"
    t.integer  "account_id"
    t.integer  "frequency_id"
    t.string   "name"
    t.text     "notes"
    t.date     "start_date"
    t.date     "reminder_date"
    t.boolean  "resolved"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "reminders", ["account_id"], name: "index_reminders_on_account_id", using: :btree
  add_index "reminders", ["frequency_id"], name: "index_reminders_on_frequency_id", using: :btree
  add_index "reminders", ["item_id"], name: "index_reminders_on_item_id", using: :btree
  add_index "reminders", ["location_id"], name: "index_reminders_on_location_id", using: :btree
  add_index "reminders", ["user_id"], name: "index_reminders_on_user_id", using: :btree

  create_table "roles", force: true do |t|
    t.string   "name"
    t.integer  "resource_id"
    t.string   "resource_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "roles", ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id", using: :btree
  add_index "roles", ["name"], name: "index_roles_on_name", using: :btree

  create_table "service_records", force: true do |t|
    t.integer  "user_vendor_id"
    t.string   "vendor_name"
    t.integer  "item_id"
    t.string   "custom_order_number"
    t.string   "po_number"
    t.datetime "service_date"
    t.string   "technician"
    t.text     "description"
    t.string   "invoice_amount"
    t.integer  "part_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "service_records", ["item_id"], name: "index_service_records_on_item_id", using: :btree
  add_index "service_records", ["part_id"], name: "index_service_records_on_part_id", using: :btree
  add_index "service_records", ["user_vendor_id"], name: "index_service_records_on_user_vendor_id", using: :btree

  create_table "states", force: true do |t|
    t.string   "abbreviation"
    t.string   "full_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.integer  "account_id"
  end

  add_index "users", ["account_id"], name: "index_users_on_account_id", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "users_roles", id: false, force: true do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "users_roles", ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id", using: :btree

  create_table "warranties", force: true do |t|
    t.integer  "item_id"
    t.integer  "part_id"
    t.date     "parts_exp"
    t.date     "labor_exp"
    t.text     "terms"
    t.integer  "location_id"
    t.integer  "account_id"
    t.date     "warranty_card_mailed_in_date"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "warranty_start_date"
    t.datetime "warranty_end_date"
    t.string   "warranty_provider"
  end

  add_index "warranties", ["account_id"], name: "index_warranties_on_account_id", using: :btree
  add_index "warranties", ["item_id"], name: "index_warranties_on_item_id", using: :btree
  add_index "warranties", ["location_id"], name: "index_warranties_on_location_id", using: :btree
  add_index "warranties", ["part_id"], name: "index_warranties_on_part_id", using: :btree

end
