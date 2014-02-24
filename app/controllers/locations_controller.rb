class LocationsController < ApplicationController
  
  before_filter :authenticate_user!
  layout 'internal'
  
  # GET /locations
  # GET /locations.json
  def index
    # TODO: Scope to user
    @locations = Location.all

    respond_to do |format|
      format.json { render json: @locations }
    end
  end

  # GET /locations/1
  # GET /locations/1.json
  def show
    @location = Location.find(params[:id])
    @address = @location.address
    coords = @address.fetch_coordinates
    
    @locations = current_user.accessible_locations # Set in Permissions Module - lib/permissions.rb
    
    @item = Item.new
    @item.photos.build
    @item.documents.build

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @location }
    end
  end

  # GET /locations/new
  # GET /locations/new.json
  def new
    @location = Location.new
    @location_count = current_user.account.locations_count
    @location.build_address
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @location }
    end
  end

  # GET /locations/1/edit
  def edit
    @location = Location.find(params[:id])
    @location_count = current_user.account.locations_count
    if @location.address.blank?
      @location.build_address
    end
  end

  # POST /locations
  # POST /locations.json
  def create
    @location = Location.new(location_params)
    @location.account_id = current_user.account.id

    respond_to do |format|
      if @location.save
        format.json { render json: @location, serializer: LocationSerializer }
      else
        format.json { render json: @location.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /locations/1
  # PUT /locations/1.json
  def update
    @location = Location.find(params[:id])
    redirect_link = return_link(params[:return_path], locations_path)
    respond_to do |format|
      if @location.update_attributes(params[:location])
        format.html { redirect_to(redirect_link, notice: 'Location was successfully updated.')}
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @location.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /locations/1
  # DELETE /locations/1.json
  def destroy
    @location = Location.find(params[:id])
    @location.destroy

    respond_to do |format|
      format.html { redirect_to locations_url }
      format.json { head :no_content }
    end
  end

private
  def location_params
    params.require(:location).permit(:name, :location_number, address_attributes: [:id, :street, :city, :zipcode, :state, :state_id])
    # params.require(:location).permit(:name, :location_number).tap do |whitelisted|
    #   whitelisted[:address] = params[:location][:address]
    # end
  end

end
