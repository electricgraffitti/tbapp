class PartsController < ApplicationController
  
  before_filter :require_user
  layout 'internal'
  
  # GET /parts
  # GET /parts.json
  def index
    @parts = Part.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @parts }
    end
  end

  # GET /parts/1
  # GET /parts/1.json
  def show
    @part = Part.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @part }
    end
  end

  # GET /parts/new
  # GET /parts/new.json
  def new
    @part = Part.new
    @item = Item.find(params[:item_id])

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @part }
    end
  end

  # GET /parts/1/edit
  def edit
    @part = Part.find(params[:id])
  end

  # POST /parts
  # POST /parts.json
  def create
    # cache the account id
    account_id = current_user.account_id

    # check that the item belongs to the account
    item = Item.check_item_account((params[:part][:item_id]).to_i, account_id)

    # if we return an item then set the part, else return back to form
    if item
      @part = Part.new(params[:part])
      @part.item_id = item.id
      @part.account_id = account_id
      @part.location_id = item.location_id
      respond_to do |format|
        if @part.save
          format.html { redirect_to(item_path(item), notice: 'Part was successfully added.') }
          format.json { render json: @part, status: :created, location: @part }
        else
          format.html { render action: "new" }
          format.json { render json: @part.errors, status: :unprocessable_entity }
        end
      end
    else
      respond_to do |format|
        format.html {redirect_to :back, notice: "Invalid item. Please try again"}
      end
    end
  end


  # PUT /parts/1
  # PUT /parts/1.json
  def update
    @part = Part.find(params[:id])

    respond_to do |format|
      if @part.update_attributes(params[:part])
        format.html { redirect_to @part, notice: 'Part was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @part.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /parts/1
  # DELETE /parts/1.json
  def destroy
    @part = Part.find(params[:id])
    @part.destroy

    respond_to do |format|
      format.html { redirect_to parts_url }
      format.json { head :no_content }
    end
  end
end
