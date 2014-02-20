# == Schema Information
#
# Table name: frequencies
#
#  id         :integer(4)      not null, primary key
#  interval   :string(255)
#  created_at :datetime        not null
#  updated_at :datetime        not null
#

class Frequency < ActiveRecord::Base
  
  # Associations
  has_many :reminders
  
  # Validations

  # Paperclip

  # Scopes

  ################################## Methods
  
end
