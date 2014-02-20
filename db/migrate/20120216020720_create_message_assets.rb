class CreateMessageAssets < ActiveRecord::Migration
  def change
    create_table :message_assets do |t|
      t.string :name
      t.integer :message_id
      t.integer :message_update_id

      t.timestamps
    end
  end
end
