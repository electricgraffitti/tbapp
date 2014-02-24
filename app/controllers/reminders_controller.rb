class RemindersController < ApplicationController
  
  before_filter :authenticate_user!
  layout 'internal'
  
  # GET /reminders
  # GET /reminders.json
  def index
    @user_reminders = Reminder.user_reminders(current_user.id)
    @item_reminders = current_user.available_item_reminders
    
    @reminder = Reminder.new
    @reminder.photos.build
    @reminder.documents.build

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @reminders }
    end
  end

  # GET /reminders/1
  # GET /reminders/1.json
  def show
    @reminder = Reminder.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @reminder }
    end
  end

  # GET /reminders/new
  # GET /reminders/new.json
  def new
    @reminder = Reminder.new
    @reminder.photos.build
    @reminder.documents.build

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @reminder }
    end
  end

  # GET /reminders/1/edit
  def edit
    @reminder = Reminder.find(params[:id])
    if @reminder.photos.blank?
      @reminder.photos.build
    end
    if @reminder.documents.blank?
      @reminder.documents.build
    end
  end

  # POST /reminders
  # POST /reminders.json
  def create
    @reminder = Reminder.new(params[:reminder])
    # Pass values to model for processing
    @reminder.set_create_values(params[:reminder], current_user)
    # Setup the reminder date (this will be useful when making cron jobs)
    @reminder.set_reminder_date(params[:reminder])
    
    redirect_link = return_link(params[:return_path], reminders_path)
    respond_to do |format|
      if @reminder.save
        format.html { redirect_to redirect_link, notice: 'Reminder was successfully created.'}
        format.json { render json: @reminder, status: :created, location: @reminder }
      else
        format.html { render action: "new" }
        format.json { render json: @reminder.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /reminders/1
  # PUT /reminders/1.json
  def update
    @reminder = Reminder.find(params[:id])
    redirect_link = return_link(params[:return_path], item_path(@reminder.item))
    respond_to do |format|
      if @reminder.update_attributes(params[:reminder])
        format.html { redirect_to redirect_link, notice: 'Reminder was successfully updated.'}
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @reminder.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /reminders/1
  # DELETE /reminders/1.json
  def destroy
    @reminder = Reminder.find(params[:id])
    @reminder.destroy

    respond_to do |format|
      format.html { redirect_to reminders_url }
      format.json { head :no_content }
    end
  end
end
