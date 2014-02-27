class ExtendedWarrantySerializer < ActiveModel::Serializer
	embed :ids, include: true

  attributes :id, :terms, :account_id, :location_id, :item_id, :part_id,
						 :parts_exp, :labor_exp

  # has_many :documents
  
end