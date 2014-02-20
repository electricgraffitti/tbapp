class WarrantiesController < ApplicationController
  
  before_filter :require_user
  layout 'internal'
  
  # GET /warranties
  # GET /warranties.json
  def index
    @locations = current_user.accessible_locations
    @location_warranty_count = current_user.account.get_warranty_count(@locations)

    @item = Item.new
    @item.photos.build
    @item.documents.build

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @warranties }
    end
  end

  # GET /warranties/1
  # GET /warranties/1.json
  def show
    @warranty = Warranty.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @warranty }
    end
  end

  # GET /warranties/new
  # GET /warranties/new.json
  def new
    
    if params[:part_id]
      @part = Part.find(params[:part_id])
    end
    
    if params[:item_id]
      @item = Item.find(params[:item_id])
    end

    @warranty = Warranty.new
    @warranty.documents.build
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @warranty }
    end
  end

  # GET /warranties/1/edit
  def edit
    @warranty = Warranty.find(params[:id])
    if @warranty.documents.blank?
      @warranty.documents.build
    end
  end

  # POST /warranties
  # POST /warranties.json
  def create
    @warranty = Warranty.new(params[:warranty])
    
    # Set check and values
    wc = @warranty.set_create_values(params[:warranty], current_user)
    respond_to do |format|
      # if we recieve a valid object back in wc
      if wc
        if @warranty.save
          redirect_link = return_link(params[:return_path], item_path(@warranty.item))
          format.html { redirect_to(redirect_link, notice: 'Warranty was successfully created.')}
          format.json { render json: @warranty, status: :created, location: @warranty }
        else
          format.html { render action: "new" }
          format.json { render json: @warranty.errors, status: :unprocessable_entity }
        end
      else
        format.html { redirect_to :back, notice: 'Credentials not valid.'}
        format.json { render json: @warranty, status: :created, location: @warranty }
      end
    end
  end

  # PUT /warranties/1
  # PUT /warranties/1.json
  def update
    @warranty = Warranty.find(params[:id])
    redirect_link = return_link(params[:return_path], item_path(@warranty.item))
    respond_to do |format|
      if @warranty.update_attributes(params[:warranty])
        format.html { redirect_to(redirect_link, notice: 'Warranty was successfully updated.')}
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @warranty.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /warranties/1
  # DELETE /warranties/1.json
  def destroy
    @warranty = Warranty.find(params[:id])
    @warranty.destroy

    respond_to do |format|
      format.html { redirect_to warranties_url }
      format.json { head :no_content }
    end
  end
end
