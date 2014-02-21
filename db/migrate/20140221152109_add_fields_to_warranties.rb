class AddFieldsToWarranties < ActiveRecord::Migration
  def change
    add_column :warranties, :warranty_start_date, :datetime
    add_column :warranties, :warranty_end_date, :datetime
    add_column :warranties, :warranty_provider, :string
  end
end
