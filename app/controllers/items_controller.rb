class ItemsController < ApplicationController
  
  before_filter :authenticate_user!
  layout 'internal'
  
  # GET /items
  # GET /items.json
  def index
    @account = current_user.account
    @locations = current_user.assigned_locations
    @accessible_locations = current_user.accessible_locations
    @tracked_items = current_user.accessible_items

    @item = Item.new
    @item.photos.build
    @item.documents.build

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @items }
    end
  end

  # GET /items/1
  # GET /items/1.json
  def show
    @item = Item.find(params[:id])
    @photo = @item.photos.last
    
    @warranty = @item.set_warranty_object
    @warranty.documents.build if @warranty.documents.empty?
    
    @extended_warranty = @item.set_extended_warranty_object
    @extended_warranty.documents.build if @extended_warranty.documents.empty?
    
    @parts = @item.parts
    
    @part = Part.new
    @part.photos.build
    @part.documents.build
    
    @p_warranty = Warranty.new
    @p_warranty.documents.build if @p_warranty.documents.empty?
    
    @p_ext_warranty = ExtendedWarranty.new
    @p_ext_warranty.documents.build if @p_ext_warranty.documents.empty?

    @reminder = Reminder.new
    @reminder.photos.build
    @reminder.documents.build

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @item }
    end
  end

  # GET /items/new
  # GET /items/new.json
  def new
    @item = Item.new
    @item.photos.build
    @item.documents.build
    @locations = current_user.accessible_locations

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @item }
    end
  end

  # GET /items/1/edit
  def edit
    @item = Item.find(params[:id])
    @locations = current_user.accessible_locations
    # @locations = current_user.get_user_locations(params[:location_id])
    
    @item.photos.build if @item.photos.blank?
    @item.documents.build if @item.documents.blank?
  end

  # POST /items
  # POST /items.json
  def create
    @item = Item.new(item_params)
    @item.account_id = current_user.account.id

    respond_to do |format|
      if @item.save
        format.json { render json: @item, serializer: ItemSerializer }
      else
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /items/1
  # PUT /items/1.json
  def update
    @item = Item.find(params[:id])
    redirect_link = return_link(params[:return_path], item_path(@item))
    respond_to do |format|
      if @item.update_attributes(params[:item])
        format.html { redirect_to(redirect_link, notice: 'Item was successfully updated.') }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /items/1
  # DELETE /items/1.json
  def destroy
    @item = Item.find(params[:id])
    @item.destroy

    respond_to do |format|
      format.html { redirect_to items_url }
      format.json { head :no_content }
    end
  end

private
  def item_params
    params.require(:items).permit(:id, :name, :serial_number, :make, :model, :purchase_date,
             :original_cost, :location_id, :notes, :purchased_from,
             :removal_date, :estimated_weight, :refrigerant_removal_quantity,
             :scrap_value, :capitalization_reason, :physical_location, :user_vendor_id,
             :vendor_id)
  end

end
