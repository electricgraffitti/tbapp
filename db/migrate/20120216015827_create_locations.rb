class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.integer :account_id
      t.integer :items_count
      t.integer :parts_count
      t.integer :warranties_count
      t.integer :extended_warranties_count
      t.string :name
      t.string :location_number
      t.integer :reminders_count
      t.integer :user_vendors_count
      t.integer :service_records_count

      t.timestamps
    end
    add_index :locations, :account_id
  end
end
