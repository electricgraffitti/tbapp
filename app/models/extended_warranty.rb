# == Schema Information
#
# Table name: extended_warranties
#
#  id          :integer(4)      not null, primary key
#  parts_exp   :date
#  labor_exp   :date
#  terms       :text
#  part_id     :integer(4)
#  item_id     :integer(4)
#  location_id :integer(4)
#  account_id  :integer(4)
#  created_at  :datetime        not null
#  updated_at  :datetime        not null
#

class ExtendedWarranty < ActiveRecord::Base
  
  # Associations
  belongs_to :part, :counter_cache => true
  belongs_to :item, :counter_cache => true
  belongs_to :location, :counter_cache => true
  belongs_to :account, :counter_cache => true

  # Assets
  has_many :documents, :dependent => :destroy
  accepts_nested_attributes_for :documents, :allow_destroy => true, :reject_if => lambda { |a| a[:attachment].blank? }

  # Validations

  # Paperclip

  # Scopes

  ################################### Methods

  def set_create_values(p,u)
    
    if p[:part_id]
      # Check for part_id in params
      parts_check = Part.exists?(p[:part_id])
        # if we have that param the we grab that and set the part and item
        if parts_check
          part = Part.find(p[:part_id])
          item = part.item
          self.item_id = part.item.id
        else
          return false
        end
    else
      # Check for item first
      item_check = Item.exists?(p[:item_id])
      # If item_check returns true
      if item_check
        # Find the item being passed from params
        item = Item.find(p[:item_id])
      else
        return false
      end
    end
    
    # Check that the item belongs to the current_user account
    if u.account_id == item.account_id
      # set the warranty account_id to the current_user.account_id
      self.account_id = u.account_id

      # set the warranty location_id to the item(set above) .location_id
      self.location_id = item.location_id
      
      self.part_id = part.id if part

      # return the modified warranty instance back to the controller
      return self
    else
      return false
    end
  end
end
