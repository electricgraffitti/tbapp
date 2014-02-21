class AddCapitalizationToItems < ActiveRecord::Migration
  def change
    add_column :items, :removal_date, :datetime
    add_column :items, :estimated_weight, :integer
    add_column :items, :refrigerant_removal_quantity, :integer
    add_column :items, :scrap_value, :integer
    add_column :items, :capitalization_reason, :text
    add_column :items, :physical_location, :string
  end
end
