class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.string :account_type
      t.integer :users_count
      t.integer :locations_count
      t.integer :items_count
      t.integer :parts_count
      t.integer :warranties_count
      t.boolean :business_account
      t.integer :reminders_count
      t.integer :extended_warranties_count
      t.boolean :business_profile
      t.integer :user_vendors_count
      t.integer :service_records_count

      t.timestamps
    end
  end
end
