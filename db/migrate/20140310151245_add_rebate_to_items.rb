class AddRebateToItems < ActiveRecord::Migration
  def change
    add_column :items, :item_rebate, :integer
  end
end
