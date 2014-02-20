# == Schema Information
#
# Table name: parts
#
#  id                        :integer(4)      not null, primary key
#  name                      :string(255)
#  item_id                   :integer(4)
#  model_number              :string(255)
#  make                      :string(255)
#  account_id                :integer(4)
#  location_id               :integer(4)
#  warranties_count          :integer(4)
#  extended_warranties_count :integer(4)
#  description               :text
#  replacement_date          :date
#  service_records_count     :integer(4)
#  created_at                :datetime        not null
#  updated_at                :datetime        not null
#

class Part < ActiveRecord::Base
  
  # Associations
  belongs_to :account, :counter_cache => true
  belongs_to :location, :counter_cache => true
  belongs_to :item, :counter_cache => true
  has_one :warranty
  has_one :extended_warranty

  has_many :service_records
  accepts_nested_attributes_for :service_records
  has_many :documents
  accepts_nested_attributes_for :documents
  has_many :photos
  accepts_nested_attributes_for :photos

  # Validations
  validates_presence_of :name, :make, :model_number, :replacement_date, :on => :create, :message => "is Required"

  # Scopes

  ################################### Methods
  
end
