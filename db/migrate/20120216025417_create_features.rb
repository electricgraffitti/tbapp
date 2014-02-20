class CreateFeatures < ActiveRecord::Migration
  def change
    create_table :features do |t|
      t.string :title
      t.text :content
      t.boolean :internal
      t.boolean :external
      t.integer :feature_category_id
      t.integer :list_order
      
      t.timestamps
    end
    add_index :features, :feature_category_id
  end
end
