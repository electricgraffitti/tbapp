# == Schema Information
#
# Table name: message_owners
#
#  id         :integer(4)      not null, primary key
#  message_id :integer(4)
#  user_id    :integer(4)
#  vendor_id  :integer(4)
#  created_at :datetime        not null
#  updated_at :datetime        not null
#

class MessageOwner < ActiveRecord::Base
  
  # Associations
  belongs_to :user
  belongs_to :message


end
