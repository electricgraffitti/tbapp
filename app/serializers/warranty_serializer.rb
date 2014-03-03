class WarrantySerializer < ActiveModel::Serializer
	embed :ids, include: true

  attributes :id, :terms, :account_id, :location_id, :item_id, :part_id,
						 :parts_exp, :labor_exp, :warranty_start_date, :warranty_end_date, :terms, :warranty_provider

  # has_many :documents

end