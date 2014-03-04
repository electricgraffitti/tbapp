class PartSerializer < ActiveModel::Serializer
	embed :ids, include: true

  attributes :id, :name, :make, :model_number, :replacement_date, :description,
             :item_id, :account_id, :location_id, :warranties_count, :service_records_count

  has_many :service_records
  has_many :warranties
  # has_many :extended_warranty
end