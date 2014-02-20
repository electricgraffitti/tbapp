class CreateFeatureCategories < ActiveRecord::Migration
  def change
    create_table :feature_categories do |t|
      t.string :feature_type

      t.timestamps
    end
  end
end
