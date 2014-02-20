class CreateLocationRoles < ActiveRecord::Migration
  def change
    create_table :location_roles do |t|
      t.integer :user_id
      t.integer :location_id
      t.boolean :location_admin
      t.boolean :location_access

      t.timestamps
    end
    add_index :location_roles, :user_id
    add_index :location_roles, :location_id
  end
end
