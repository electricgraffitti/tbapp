class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.integer :account_id
      t.integer :items_count, default: 0
      t.integer :parts_count, default: 0
      t.integer :warranties_count, default: 0
      t.integer :extended_warranties_count, default: 0
      t.string :name
      t.string :location_number
      t.integer :reminders_count, default: 0
      t.integer :user_vendors_count, default: 0
      t.integer :service_records_count, default: 0

      t.timestamps
    end
    add_index :locations, :account_id
  end
end
