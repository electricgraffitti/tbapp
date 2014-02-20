# == Schema Information
#
# Table name: items
#
#  id                        :integer(4)      not null, primary key
#  name                      :string(255)
#  serial_number             :string(255)
#  make                      :string(255)
#  model                     :string(255)
#  purchase_date             :date
#  original_cost             :integer(4)
#  account_id                :integer(4)
#  location_id               :integer(4)
#  notes                     :string(255)
#  parts_count               :integer(4)
#  warranties_count          :integer(4)
#  purchased_from            :string(255)
#  extended_warranties_count :integer(4)
#  reminders_count           :integer(4)
#  user_vendor_id            :integer(4)
#  vendor_id                 :integer(4)
#  service_records_count     :integer(4)
#  created_at                :datetime        not null
#  updated_at                :datetime        not null
#

class Item < ActiveRecord::Base
  
  # Associations
  belongs_to :account, :counter_cache => true
  belongs_to :location, :counter_cache => true
  belongs_to :user_vendor, :counter_cache => true

  has_one :warranty
  has_one :extended_warranty

  has_many :parts
  accepts_nested_attributes_for :parts
  has_many :reminders
  accepts_nested_attributes_for :reminders
  has_many :service_records
  accepts_nested_attributes_for :service_records

  # Assets
  has_many :photos, :dependent => :destroy
  has_many :documents, :dependent => :destroy

  accepts_nested_attributes_for :photos, :allow_destroy => true, :reject_if => lambda { |a| a[:attachment].blank? }
  accepts_nested_attributes_for :documents, :allow_destroy => true, :reject_if => lambda { |a| a[:attachment].blank? }

  # Validations
  validates_presence_of :name, :serial_number, :make, :model, :original_cost, :purchased_from, :on => :create, :message => "is Required."
  validates_numericality_of :original_cost, :on => :create, :message => "Number only no $ sign"
  validates_length_of :name, :maximum => 34, :on => :create, :message => "maximum 34 characters"

  # Scopes

  ################################### Methods

  def self.check_item_account(id, aid)
    item = Item.find_by_id(id)
    if item.account_id == aid
      return item
    else
      return false
    end
  end
  
  def set_warranty_object
    if self.warranty
      wo = self.warranty
    else
      wo = self.build_warranty
    end
  end
  
  def set_extended_warranty_object
    if self.extended_warranty
      ewo = self.extended_warranty
    else
      ewo = self.build_extended_warranty
    end
  end
  
  def unresolved_reminders
    # find a reminders that have not been marked resolved
    reminders = Reminder.where("item_id = ? && resolved != ?", self.id, true)
    return reminders
  end
  
end
