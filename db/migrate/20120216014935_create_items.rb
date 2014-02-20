class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :name
      t.string :serial_number
      t.string :make
      t.string :model
      t.date :purchase_date
      t.integer :original_cost
      t.integer :account_id
      t.integer :location_id
      t.string :notes
      t.integer :parts_count
      t.integer :warranties_count
      t.string :purchased_from
      t.integer :extended_warranties_count
      t.integer :reminders_count
      t.integer :user_vendor_id
      t.integer :vendor_id
      t.integer :service_records_count

      t.timestamps
    end
    add_index :items, :account_id
    add_index :items, :location_id
    add_index :items, :user_vendor_id
    add_index :items, :vendor_id
  end
end
