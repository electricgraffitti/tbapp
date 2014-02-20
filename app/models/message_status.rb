# == Schema Information
#
# Table name: message_statuses
#
#  id          :integer(4)      not null, primary key
#  status_name :string(255)
#  status_type :string(255)
#  created_at  :datetime        not null
#  updated_at  :datetime        not null
#

class MessageStatus < ActiveRecord::Base
  
  # Associations
  has_many :messages

  # Scopes
  scope :contributor_update, :conditions => ['status_type != ? AND status_type != ?', "open", "closed"]
  scope :owner_update, :conditions => ['status_type != ?', "open"]
  
end
