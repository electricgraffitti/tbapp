class CreateExtendedWarranties < ActiveRecord::Migration
  def change
    create_table :extended_warranties do |t|
      t.date :parts_exp
      t.date :labor_exp
      t.text :terms
      t.integer :part_id
      t.integer :item_id
      t.integer :location_id
      t.integer :account_id

      t.timestamps
    end
    add_index :extended_warranties, :part_id
    add_index :extended_warranties, :item_id
    add_index :extended_warranties, :location_id
    add_index :extended_warranties, :account_id
  end
end
