class LocationRolesController < ApplicationController
  
  before_filter :authenticate_user!
  layout 'internal'
  
  # GET /location_roles
  # GET /location_roles.json
  def index
    @account = current_user.account
    @location_roles = LocationRole.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @location_roles }
    end
  end

  # GET /location_roles/1
  # GET /location_roles/1.json
  def show
    @location_role = LocationRole.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @location_role }
    end
  end

  # GET /location_roles/new
  # GET /location_roles/new.json
  def new
    @location_role = LocationRole.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @location_role }
    end
  end

  # GET /location_roles/1/edit
  def edit
    @location_role = LocationRole.find(params[:id])
  end

  # POST /location_roles
  # POST /location_roles.json
  def create
    @location_role = LocationRole.new(params[:location_role])
    
    redirect_link = return_link(params[:return_path], :back)
    respond_to do |format|
      if @location_role.valid?
        if current_user.account.user_account_check(@location_role.user_id)
          @location_role.save
          format.html { redirect_to(redirect_link, notice: 'User permissions have been set.')}
        else
          format.html { redirect_to(redirect_link, notice: 'Invalid settings. Please try again.')}
        end
      else
        format.html {redirect_to(redirect_link, notice: 'Invalid settings. Please try again.')}
      end
    end
  end

  # PUT /location_roles/1
  # PUT /location_roles/1.json
  def update
    @location_role = LocationRole.find(params[:id])
    redirect_link = return_link(params[:return_path], location_role_path(@location_role))

    respond_to do |format|
      if @location_role.update_attributes(params[:location_role])
        format.html { redirect_to @location_role, notice: 'Message assignment was successfully updated.' }
      else
        format.html { render action: "edit" }
      end
    end
  end

  # DELETE /location_roles/1
  # DELETE /location_roles/1.json
  def destroy
    @location_role = LocationRole.find(params[:id])
    @location_role.destroy

    respond_to do |format|
      format.html { redirect_to location_roles_url }
      format.json { head :no_content }
    end
  end
end
