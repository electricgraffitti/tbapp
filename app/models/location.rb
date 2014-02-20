# == Schema Information
#
# Table name: locations
#
#  id                        :integer(4)      not null, primary key
#  account_id                :integer(4)
#  items_count               :integer(4)
#  parts_count               :integer(4)
#  warranties_count          :integer(4)
#  extended_warranties_count :integer(4)
#  name                      :string(255)
#  location_number           :string(255)
#  reminders_count           :integer(4)
#  user_vendors_count        :integer(4)
#  service_records_count     :integer(4)
#  created_at                :datetime        not null
#  updated_at                :datetime        not null
#

class Location < ActiveRecord::Base
  
  # Associations
  belongs_to :account, :counter_cache => true
  has_one :address
  accepts_nested_attributes_for :address

  has_many :items
  has_many :service_records, :through => :items
  has_many :user_vendors, :through => :items
  has_many :warranties
  has_many :location_roles
  has_many :users, :through => :location_roles

  # Validations

  # Scopes
  scope :editable_locations, lambda {|u| where('location_roles.user_id = ? AND location_admin = ?', u, true).includes(:location_roles)}
  scope :viewable_locations, lambda {|u| where('location_roles.user_id = ? AND location_admin = ?', u, false).includes(:location_roles)}
  scope :assigned_locations, lambda {|u| where('location_roles.user_id = ?', u).includes(:location_roles)}
  ################################### Methods
  
  include Permissions

  def setup_new_location(account, address, user)
    self.items_count = 0
    self.parts_count = 0
    self.warranties_count = 0
    self.extended_warranties_count = 0
    if account.account_type == "Personal"
      self.name = "Default"
    else
      self.name = "Default"
    end
    if self.valid?
      ady = Address.new
      address_check = ady.setup_new_address(account, address, user, self)
      if address_check == false
        return false
      end
    else
      return false
    end
  end
  
  def set_base_location_attributes(u)
    self.account_id = u.account.id
    self.items_count = 0
    self.parts_count = 0 
    self.warranties_count = 0
    self.extended_warranties_count = 0
    return self
  end
  
end
