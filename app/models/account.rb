# == Schema Information
#
# Table name: accounts
#
#  id                        :integer(4)      not null, primary key
#  account_type              :string(255)
#  users_count               :integer(4)
#  locations_count           :integer(4)
#  items_count               :integer(4)
#  parts_count               :integer(4)
#  warranties_count          :integer(4)
#  business_account          :boolean(1)
#  reminders_count           :integer(4)
#  extended_warranties_count :integer(4)
#  business_profile          :boolean(1)
#  user_vendors_count        :integer(4)
#  service_records_count     :integer(4)
#  created_at                :datetime        not null
#  updated_at                :datetime        not null
#

class Account < ActiveRecord::Base
  
  # Associations
  has_many :users
  has_many :locations
  has_many :items, :through => :locations
  has_many :parts, :through => :items
  has_many :warranties
  has_many :extended_warranties
  has_many :reminders
  has_many :user_vendors
  has_many :service_records, :through => :user_vendors
  has_one :account_detail
  accepts_nested_attributes_for :account_detail

end
