class CreateParts < ActiveRecord::Migration
  def change
    create_table :parts do |t|
      t.string :name
      t.integer :item_id
      t.string :model_number
      t.string :make
      t.integer :account_id
      t.integer :location_id
      t.integer :warranties_count
      t.integer :extended_warranties_count
      t.text :description
      t.date :replacement_date
      t.integer :service_records_count

      t.timestamps
    end
    add_index :parts, :account_id
    add_index :parts, :location_id
    add_index :parts, :item_id
  end
end
