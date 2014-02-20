class CreateMessageUpdates < ActiveRecord::Migration
  def change
    create_table :message_updates do |t|
      t.integer :message_id
      t.integer :user_id
      t.integer :vendor_id
      t.text :content

      t.timestamps
    end
    add_index :message_updates, :message_id
    add_index :message_updates, :user_id
    add_index :message_updates, :vendor_id
  end
end
