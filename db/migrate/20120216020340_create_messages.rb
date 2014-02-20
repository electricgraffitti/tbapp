class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :title
      t.text :content
      t.integer :message_status_id
      t.integer :message_priority_id
      t.date :due_date

      t.timestamps
    end
    add_index :messages, :message_status_id
    add_index :messages, :message_priority_id
  end
end
