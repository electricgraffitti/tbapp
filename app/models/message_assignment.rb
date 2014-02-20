# == Schema Information
#
# Table name: message_assignments
#
#  id           :integer(4)      not null, primary key
#  message_id   :integer(4)
#  user_id      :integer(4)
#  vendor_id    :integer(4)
#  message_read :boolean(1)
#  created_at   :datetime        not null
#  updated_at   :datetime        not null
#

class MessageAssignment < ActiveRecord::Base
  
  # Associations
  belongs_to :user
  belongs_to :message
  
  scope :unread_messages, lambda { |uid| where("user_id = ? AND message_read = ?", uid, false)}
  scope :assigned_message, lambda { |uid, mid| where("user_id = ? AND message_id = ?", uid, mid)}
  
end
