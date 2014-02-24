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
    @service_record = ServiceRecord.new(params[:service_record])

    respond_to do |format|
      if @service_record.save
        format.html { redirect_to @service_record, notice: 'Service record was successfully created.' }
        format.json { render json: @service_record, status: :created, location: @service_record }
      else
        format.html { render action: "new" }
        format.json { render json: @service_record.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /service_records/1
  # PUT /service_records/1.json
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

  # DELETE /service_records/1
  # DELETE /service_records/1.json
  def destroy
    @service_record = ServiceRecord.find(params[:id])
    @service_record.destroy

    respond_to do |format|
      format.html { redirect_to service_records_url }
      format.json { head :no_content }
    end
  end
end
