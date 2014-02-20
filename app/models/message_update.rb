# == Schema Information
#
# Table name: message_updates
#
#  id         :integer(4)      not null, primary key
#  message_id :integer(4)
#  user_id    :integer(4)
#  vendor_id  :integer(4)
#  content    :text
#  created_at :datetime        not null
#  updated_at :datetime        not null
#

class MessageUpdate < ActiveRecord::Base
  
  # Associations
  belongs_to :user
  belongs_to :message, :class_name => "Message"
  accepts_nested_attributes_for :message, :allow_destroy => true

  has_many :message_assets
  accepts_nested_attributes_for :message_assets, :allow_destroy => true, :reject_if => lambda { |a| a[:attachment].blank? }

  validates_presence_of :content

  # Scopes
  scope :listed, order("created_at DESC")
  
end
