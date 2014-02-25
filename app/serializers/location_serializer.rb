class LocationSerializer < ActiveModel::Serializer
	embed :ids, include: true

  attributes :id, :name, :location_number, :items_count, :account_id,
						 :parts_count, :warranties_count, :extended_warranties_count, :name, 
						 :location_number, :reminders_count, :user_vendors_count, :service_records_count    

  has_one :address
  has_many :items
  has_many :service_records
  has_many :warranties
  # has_many :location_roles
  # has_many :users

end