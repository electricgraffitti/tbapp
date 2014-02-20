class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.integer :location_id
      t.string :street
      t.string :city
      t.integer :state_id
      t.string :zipcode
      t.float :latitude
      t.float :longitude
      t.integer :account_detail_id

      t.timestamps
    end
    add_index :addresses, :location_id
    add_index :addresses, :state_id
    add_index :addresses, :account_detail_id
  end
end
