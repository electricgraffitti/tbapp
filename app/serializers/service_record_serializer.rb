class ServiceRecordSerializer < ActiveModel::Serializer
	embed :ids, include: true

  attributes :id, :custom_order_number, :po_number, :service_date, :item_id,
             :technician, :description, :invoice_amount, :part_id, :user_vendor_id, :vendor_name
             
end
