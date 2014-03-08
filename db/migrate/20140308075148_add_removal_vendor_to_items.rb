class AddRemovalVendorToItems < ActiveRecord::Migration
  def change
    add_column :items, :removal_vendor, :string
    add_column :items, :is_capitalized, :boolean
  end
end
