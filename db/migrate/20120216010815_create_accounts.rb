class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.string :account_type
      t.integer :users_count, default: 0
      t.integer :locations_count, default: 0
      t.integer :items_count, default: 0
      t.integer :parts_count, default: 0
      t.integer :warranties_count, default: 0
      t.boolean :business_account, default: 0
      t.integer :reminders_count, default: 0
      t.integer :extended_warranties_count, default: 0
      t.boolean :business_profile
      t.integer :user_vendors_count, default: 0
      t.integer :service_records_count, default: 0

      t.timestamps
    end
  end
end
