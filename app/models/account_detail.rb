# == Schema Information
#
# Table name: account_details
#
#  id             :integer(4)      not null, primary key
#  company_name   :string(255)
#  business_type  :string(255)
#  main_contact   :string(255)
#  business_phone :string(255)
#  business_fax   :string(255)
#  business_hours :string(255)
#  account_id     :integer(4)
#  created_at     :datetime        not null
#  updated_at     :datetime        not null
#

class AccountDetail < ActiveRecord::Base
  
  # CallBacks
  # before_save :sanitize_phone

  # Associations
  belongs_to :account
  has_one :address
  accepts_nested_attributes_for :address

  validates_presence_of :company_name,
    :business_type,
    :main_contact,
    :business_phone,
    :business_hours,
    :business_fax,
    :on => :create, :message => "can't be blank"

  # Scopes

  ######################## Methods
end
