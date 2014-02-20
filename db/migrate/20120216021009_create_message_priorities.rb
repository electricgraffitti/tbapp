class CreateMessagePriorities < ActiveRecord::Migration
  def change
    create_table :message_priorities do |t|
      t.string :priority_name
      t.string :priority_type

      t.timestamps
    end
  end
end
