# == Schema Information
#
# Table name: service_records
#
#  id                  :integer(4)      not null, primary key
#  user_vendor_id      :integer(4)
#  item_id             :integer(4)
#  custom_order_number :string(255)
#  po_number           :string(255)
#  service_date        :datetime
#  technician          :string(255)
#  description         :text
#  invoice_amount      :string(255)
#  part_id             :integer(4)
#  created_at          :datetime        not null
#  updated_at          :datetime        not null
#

class ServiceRecord < ActiveRecord::Base
  
  # Associations
  belongs_to :user_vendor, :counter_cache => true
  belongs_to :part, :counter_cache => true
  belongs_to :item, :counter_cache => true

  # Validations

  # Paperclip

  # Scopes

  ################################## Methods
  
end
