class ExtendedWarrantiesController < ApplicationController
  
  before_filter :authenticate_user!
  layout "internal"
  
  # GET /extended_warranties
  # GET /extended_warranties.json
  def index
    @extended_warranties = ExtendedWarranty.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @extended_warranties }
    end
  end

  # GET /extended_warranties/1
  # GET /extended_warranties/1.json
  def show
    @extended_warranty = ExtendedWarranty.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @extended_warranty }
    end
  end

  # GET /extended_warranties/new
  # GET /extended_warranties/new.json
  def new
    @extended_warranty = ExtendedWarranty.new
    @extended_warranty = ExtendedWarranty.new
    @extended_warranty.photos.build
    @extended_warranty.documents.build
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @extended_warranty }
    end
  end

  # GET /extended_warranties/1/edit
  def edit
    @extended_warranty = ExtendedWarranty.find(params[:id])
    if @extended_warranty.documents.blank?
      @extended_warranty.documents.build
    end
  end

  # POST /extended_warranties
  # POST /extended_warranties.json
  def create
    @extended_warranty = ExtendedWarranty.new(params[:extended_warranty])
    
    # Do a check for the account params and item params against the current user. Prevents Mass Assignment Hack
    ewc = @extended_warranty.set_create_values(params[:extended_warranty], current_user)
    respond_to do |format|
      # if we recieve a valid object back in wc
      if ewc
        if @extended_warranty.save
          redirect_link = return_link(params[:return_path], item_path(@extended_warranty.item))
          format.html { redirect_to(redirect_link, notice: 'Extended warranty was successfully created.') }
          format.json { render json: @extended_warranty, status: :created, location: @extended_warranty }
        else
          format.html { render action: "new" }
          format.json { render json: @extended_warranty.errors, status: :unprocessable_entity }
        end
      else
        format.html { redirect_to :back, :notice => "Credentials not valid."}
        format.xml  { render json: @extended_warranty.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /extended_warranties/1
  # PUT /extended_warranties/1.json
  def update
    @extended_warranty = ExtendedWarranty.find(params[:id])
    redirect_link = return_link(params[:return_path], item_path(@extended_warranty.item))
    respond_to do |format|
      if @extended_warranty.update_attributes(params[:extended_warranty])
        format.html { redirect_to(redirect_link, notice: 'Extended warranty was successfully updated.') }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @extended_warranty.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /extended_warranties/1
  # DELETE /extended_warranties/1.json
  def destroy
    @extended_warranty = ExtendedWarranty.find(params[:id])
    @extended_warranty.destroy

    respond_to do |format|
      format.html { redirect_to extended_warranties_url }
      format.json { head :no_content }
    end
  end
end
