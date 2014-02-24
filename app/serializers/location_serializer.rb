class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :location_number, :account_id, :items_count,             
						 :parts_count, :warranties_count, :extended_warranties_count, :name, 
						 :location_number, :reminders_count, :user_vendors_count, :service_records_count    

  has_one :address

end