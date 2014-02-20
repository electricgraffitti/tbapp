class CreateMessageStatuses < ActiveRecord::Migration
  def change
    create_table :message_statuses do |t|
      t.string :status_name
      t.string :status_type

      t.timestamps
    end
  end
end
