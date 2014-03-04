class PartsController < ApplicationController
  
  before_filter :authenticate_user!
  layout 'internal'
  
  def index
    @parts = Part.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @parts }
    end
  end

  def show
    @part = Part.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @part }
    end
  end

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

  def create
    # cache the account id
    account_id = current_user.account_id

    # check that the item belongs to the account
    item = Item.check_item_account((params[:part][:item_id]).to_i, account_id)

    # if we return an item then set the part, else return back to form
    if item
      @part = Part.new(part_params)
      @part.item_id = item.id
      @part.account_id = account_id
      @part.location_id = item.location_id
      respond_to do |format|
        if @part.save
          format.json { render json: @part, serializer: PartSerializer }
        else
          format.json { render json: @part.errors, status: :unprocessable_entity }
        end
      end
    else
      respond_to do |format|
        format.json { render json: {part_error: 'Item is not in your account'}, status: :unprocessable_entity }
      end
    end
  end

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

private
  def part_params
    params.require(:part)
          .permit(:id, :item_id, :name, :make, :model_number, :replacement_date, :description)
  end
end
