class AddRebateToItems < ActiveRecord::Migration
  def change
    add_column :items, :item_rebate, :integer, default: 0
  end
end
