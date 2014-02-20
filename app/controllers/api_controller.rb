class ApiController < ApplicationController

  # Basic User Information
  def basic_user_info
    @user = User.find(params[:id])

    respond_to do |format|
      format.html { render :layout => false }
      format.xml  { render :xml => @user }
      format.json { render :layout => false }
    end
  end

  # Basic Location Info
  def basic_location_info
    @location = Location.find(params[:id])
    @address = @location.address

    if @address
      map_type = GMapType::G_HYBRID_MAP
      coords = @address.fetch_coordinates()
      @map = GMap.new("charts_maps_wrap")
      @map.control_init(:large_map => true, :map_type => true)
      @map.center_zoom_init(coords,14)
      @map.overlay_init(GMarker.new(coords,:title => "#{@location.name}", :info_window => "Location"))
      @map.set_map_type_init(map_type)
    end

    respond_to do |format|
      format.html { render :layout => false }
      format.xml  { render :xml => @location }
      format.json { render :layout => false }
    end
  end

  # Basic Service Inforamtion
  def basic_service_info
    @item_service = ItemService.find(params[:id])

    respond_to do |format|
      format.html { render :layout => false }
      format.xml  { render :xml => @item_service }
      format.json { render :layout => false }
    end
  end
  
  # Basic Service Inforamtion
  def basic_reminder_info
    @reminder = Reminder.find(params[:id])

    respond_to do |format|
      format.html { render :layout => false }
      format.xml  { render :xml => @reminder }
      format.json { render :layout => false }
    end
  end

  # Basic Warranty Information
  def basic_warranty_info
    @warranty = Warranty.find(params[:id])

    respond_to do |format|
      format.html { render :layout => false }
      format.xml  { render :xml => @warranty }
      format.json { render :layout => false }
    end
  end

  # User Index sidebar with location add
  def user_index_assign
    @user = User.find(params[:id])
    @location_role = LocationRole.new
    respond_to do |format|
      format.html { render :layout => false }
      format.xml  { render :xml => @item_service }
      format.json { render :layout => false }
    end
  end

  def basic_item_info
    @item = Item.find(params[:id])

    respond_to do |format|
      format.html { render :layout => false }
      format.xml  { render :xml => @item }
      format.json { render :layout => false }
    end
  end

  def basic_message_info
    @message = Message.find(params[:id])

    respond_to do |format|
      format.html { render :layout => false }
      format.xml  { render :xml => @message }
      format.json { render :layout => false }
    end
  end

  def ajax_location_form
    @location = Location.new
    @location_count = current_user.account.locations_count
    @max_locations = current_user.account.max_locations
    @location.build_address
    respond_to do |format|
      format.html { render :layout => false }
      format.json { render :layout => false }
    end
  end

  def ajax_item_form
    @item = Item.new
    @item.photos.build
    @item.documents.build
    @locations = current_user.get_user_locations(params[:location_id])

    respond_to do |format|
      format.html { render :layout => false }
      format.xml  { render :xml => @item }
      format.json { render :layout => false }
    end
  end

  def ajax_avatar_form
    @user = current_user
    @user.build_avatar
    respond_to do |format|
      format.html { render :layout => false }
      format.xml  { render :xml => @item }
      format.json { render :layout => false }
    end
  end

  def ajax_user_form
    @user = User.new
    @user_count = current_user.account.users_count
    @max_users = current_user.account.max_users
    @locations = Location.find_all_by_account_id(current_user.account.id)
    @user.build_avatar
    respond_to do |format|
      format.html { render :layout => false }
      format.json { render :layout => false }
    end
  end

  def ajax_message_form
    @message = Message.new
    @message.message_assets.build
    @users = current_user.account.users

    respond_to do |format|
      format.html { render :layout => false }
      format.json { render :layout => false }
    end
  end

  def ajax_service_form
    @item_service = ItemService.new
    @item_service.photos.build
    @item_service.documents.build

    respond_to do |format|
      format.html { render :layout => false }
      format.json { render :layout => false }
    end
  end
  
  def ajax_reminder_resolve
    @reminder = Reminder.find(params[:id])
    @reminder[:resolved] = 1
    @reminder.save
    respond_to do |format|
      format.json { render :layout => false }
    end
  end

end
