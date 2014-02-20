# == Schema Information
#
# Table name: message_priorities
#
#  id            :integer(4)      not null, primary key
#  priority_name :string(255)
#  priority_type :string(255)
#  created_at    :datetime        not null
#  updated_at    :datetime        not null
#

class MessagePriority < ActiveRecord::Base
  
  # Associations
  has_many :messages
  
end
