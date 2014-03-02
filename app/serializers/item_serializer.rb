class ItemSerializer < ActiveModel::Serializer
	embed :ids, include: true

  attributes :id, :name, :serial_number, :make, :model, :purchase_date,
             :original_cost, :account_id, :location_id, :notes, :purchased_from,
						 :parts_count, :warranties_count, :extended_warranties_count, 
						 :reminders_count, :service_records_count,
             :removal_date, :estimated_weight, :refrigerant_removal_quantity,
             :scrap_value, :capitalization_reason, :physical_location, :user_vendor_id,
             :vendor_id

  has_many :service_records
  # has_one :warranty
  # has_one :extended_warranty
  
  # has_many :reminders
end