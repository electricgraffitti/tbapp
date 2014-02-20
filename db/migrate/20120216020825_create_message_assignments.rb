class CreateMessageAssignments < ActiveRecord::Migration
  def change
    create_table :message_assignments do |t|
      t.integer :message_id
      t.integer :user_id
      t.integer :vendor_id
      t.boolean :message_read

      t.timestamps
    end
    add_index :message_assignments, :message_id
    add_index :message_assignments, :user_id
    add_index :message_assignments, :vendor_id
  end
end
