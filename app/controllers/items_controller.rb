class ItemsController < ApplicationController
  
  before_filter :authenticate_user!
  layout 'internal'
  
  def index
    @items = Item.all
    respond_to do |format|
      format.json { render json: @items }
    end
  end

  def show
    @item = Item.find(params[:id])
    respond_to do |format|
      format.json { render json: @item }
    end
  end

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

  def update
    @item = Item.find(params[:id])

    respond_to do |format|
      if @item.update_attributes(capitalize_params)
        format.json { head :no_content }
      else
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy

    respond_to do |format|
      format.html { redirect_to items_url }
      format.json { head :no_content }
    end
  end

private
  def capitalize_params
    params.require(:item).permit(:removal_date, :estimated_weight, :refrigerant_removal_quantity,
             :scrap_value, :capitalization_reason, :removal_vendor, :is_capitalized)
  end

  def item_params
    params.require(:item).permit(:id, :name, :serial_number, :make, :model, :purchase_date,
             :original_cost, :location_id, :notes, :purchased_from,
             :removal_date, :estimated_weight, :refrigerant_removal_quantity,
             :scrap_value, :capitalization_reason, :physical_location, :user_vendor_id,
             :vendor_id)
  end
end
