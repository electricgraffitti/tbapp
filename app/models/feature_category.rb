# == Schema Information
#
# Table name: feature_categories
#
#  id           :integer(4)      not null, primary key
#  feature_type :string(255)
#  created_at   :datetime        not null
#  updated_at   :datetime        not null
#

class FeatureCategory < ActiveRecord::Base
  
  # Associations
  has_many :features
  # Validations

  # Paperclip

  # Scopes

  ################################## Methods
  
end
