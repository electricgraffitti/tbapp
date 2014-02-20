class CreateMessageOwners < ActiveRecord::Migration
  def change
    create_table :message_owners do |t|
      t.integer :message_id
      t.integer :user_id
      t.integer :vendor_id

      t.timestamps
    end
    add_index :message_owners, :message_id
    add_index :message_owners, :user_id
    add_index :message_owners, :vendor_id
  end
end
