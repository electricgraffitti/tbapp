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

  # Scopes

  ################################# Methods
  
  include Permissions
  
  # sums the warrany count for a locations array
  def get_warranty_count(locations)
    lc = 0
    locations.each do |l|
      lc = l.warranties_count + lc
    end
    return lc
  end

  # Part of the initial account sign up process
  def setup_new_account(user, address)
    self.locations_count = 0
    self.items_count = 0
    self.reminders_count = 0
    self.parts_count = 0
    self.warranties_count = 0
    self.extended_warranties_count = 0
    self.user_vendors_count = 0
    self.service_records_count = 0
    if self.account_type == "Business"
      self.business_account = 1
    end
    if self.valid?
      loc = Location.new
      location_check = loc.setup_new_location(self, address, user)
      if location_check == false
        return false
      end
    else
      return false
    end
  end
end
