# == Schema Information
#
# Table name: features
#
#  id                  :integer(4)      not null, primary key
#  title               :string(255)
#  content             :text
#  internal            :boolean(1)
#  external            :boolean(1)
#  feature_category_id :integer(4)
#  list_order          :integer(4)
#  created_at          :datetime        not null
#  updated_at          :datetime        not null
#

class Feature < ActiveRecord::Base
  
  #Validations
  validates_presence_of :title, :content
  
  #Associations
  has_many :screenshots, :dependent => :destroy
  has_many :videos, :dependent => :destroy
  belongs_to :feature_category
  
  #Scopes
  scope :feature_order, order("list_order").limit(6)
  #Assets
  accepts_nested_attributes_for :screenshots, :allow_destroy => true, :reject_if => lambda { |a| a[:attachment].blank? }
  accepts_nested_attributes_for :videos, :allow_destroy => true, :reject_if => lambda { |a| a[:attachment].blank? }
  
end
