# == Schema Information
#
# Table name: states
#
#  id           :integer(4)      not null, primary key
#  abbreviation :string(255)
#  full_name    :string(255)
#  created_at   :datetime        not null
#  updated_at   :datetime        not null
#

class State < ActiveRecord::Base
  
  # Associations
  
  # Validations
  
  # Paperclip
  
  # Scopes
  
  ################################### Methods
  
end
