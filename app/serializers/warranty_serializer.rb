class WarrantySerializer < ActiveModel::Serializer
	embed :ids, include: true

  attributes :id, :terms, :account_id, :location_id, :item_id, :part_id,
						 :parts_exp, :labor_exp, :warranty_card_mailed_in_date

  # has_many :documents
  
end