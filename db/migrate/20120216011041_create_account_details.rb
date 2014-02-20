class CreateAccountDetails < ActiveRecord::Migration
  def change
    create_table :account_details do |t|
      t.string :company_name
      t.string :business_type
      t.string :main_contact
      t.string :business_phone
      t.string :business_fax
      t.string :business_hours
      t.integer :account_id

      t.timestamps
    end
    add_index :account_details, :account_id
  end
end
