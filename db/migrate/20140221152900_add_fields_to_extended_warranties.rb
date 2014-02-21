class AddFieldsToExtendedWarranties < ActiveRecord::Migration
  def change
    add_column :extended_warranties, :extended_warranty_start_date, :datetime
    add_column :extended_warranties, :extended_warranty_end_date, :datetime
    add_column :extended_warranties, :extended_warranty_provider, :string
  end
end
