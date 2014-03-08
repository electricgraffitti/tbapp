class ServiceRecordsController < ApplicationController

  before_filter :authenticate_user!
  # GET /service_records
  # GET /service_records.json
  def index
    @service_records = ServiceRecord.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @service_records }
    end
  end

  # GET /service_records/1
  # GET /service_records/1.json
  def show
    @service_record = ServiceRecord.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @service_record }
    end
  end

  # GET /service_records/new
  # GET /service_records/new.json
  def new
    @service_record = ServiceRecord.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @service_record }
    end
  end

  # GET /service_records/1/edit
  def edit
    @service_record = ServiceRecord.find(params[:id])
  end

  # POST /service_records
  # POST /service_records.json
  def create
    @service_record = ServiceRecord.new(service_record_params)

    respond_to do |format|
      if @service_record.save
        format.json { render json: @service_record, serializer: ServiceRecordSerializer }
      else
        format.json { render json: @service_record.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @service_record = ServiceRecord.find(params[:id])

    respond_to do |format|
      if @service_record.update_attributes(params[:service_record])
        format.html { redirect_to @service_record, notice: 'Service record was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @service_record.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @service_record = ServiceRecord.find(params[:id])
    @service_record.destroy

    respond_to do |format|
      format.html { redirect_to service_records_url }
      format.json { head :no_content }
    end
  end
#  item_id             :integer(4)
#  custom_order_number :string(255)
#  po_number           :string(255)
#  service_date        :datetime
#  technician          :string(255)
#  description         :text
#  invoice_amount      :string(255)
private
  def service_record_params
    params.require(:service_record).permit(:id, :vendor_name, :item_id, :custom_order_number, :po_number, :service_date,
             :technician, :description, :invoice_amount, :part_id, :user_vendor_id)
  end
end
