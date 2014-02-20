class CreateReminders < ActiveRecord::Migration
  def change
    create_table :reminders do |t|
      t.integer :item_id
      t.integer :location_id
      t.integer :account_id
      t.integer :frequency_id
      t.string :name
      t.text :notes
      t.date :start_date
      t.date :reminder_date
      t.boolean :resolved
      t.integer :user_id

      t.timestamps
    end
    add_index :reminders, :item_id
    add_index :reminders, :location_id
    add_index :reminders, :account_id
    add_index :reminders, :frequency_id
    add_index :reminders, :user_id
  end
end
