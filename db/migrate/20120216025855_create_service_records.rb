class CreateServiceRecords < ActiveRecord::Migration
  def change
    create_table :service_records do |t|
      t.integer :user_vendor_id
      t.integer :item_id
      t.string :custom_order_number
      t.string :po_number
      t.datetime :service_date
      t.string :technician
      t.text :description
      t.string :invoice_amount
      t.integer :part_id
      
      t.timestamps
    end
    add_index :service_records, :user_vendor_id
    add_index :service_records, :item_id
    add_index :service_records, :part_id
  end
end
