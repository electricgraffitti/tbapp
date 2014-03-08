class AddVendorNameToParts < ActiveRecord::Migration
  def change
    add_column :parts, :vendor_name, :string
  end
end
