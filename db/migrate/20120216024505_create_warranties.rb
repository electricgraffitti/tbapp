class CreateWarranties < ActiveRecord::Migration
  def change
    create_table :warranties do |t|
      t.integer :item_id
      t.integer :part_id
      t.date :parts_exp
      t.date :labor_exp
      t.text :terms
      t.integer :location_id
      t.integer :account_id
      t.date :warranty_card_mailed_in_date
      
      t.timestamps
    end
    add_index :warranties, :item_id
    add_index :warranties, :part_id
    add_index :warranties, :location_id
    add_index :warranties, :account_id
  end
end
