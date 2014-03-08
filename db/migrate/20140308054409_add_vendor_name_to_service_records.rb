class AddVendorNameToServiceRecords < ActiveRecord::Migration
  def change
    add_column :service_records, :vendor_name, :string
  end
end
