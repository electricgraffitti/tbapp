class MessagesController < ApplicationController
  
  before_filter :require_user  
  layout 'internal'
  
  # GET /messages
  # GET /messages.json
  def index
    @message = Message.new
    @message.message_assets.build
    @users = current_user.account.users
    
    @owned_messages = Message.owned_messages(current_user)
    @assigned_messages = Message.assigned_messages(current_user)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @messages }
    end
  end

  # GET /messages/1
  # GET /messages/1.json
  def show
    @message = Message.find(params[:id])
    if @message.message_owner.id != current_user.id
      message_opened_check = @message.set_message_read(current_user.id)
      if message_opened_check == 'changed'
        cookies[:unread_message_count] = nil
      end
    end
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @message }
    end
  end

  # GET /messages/new
  # GET /messages/new.json
  def new
    @message = Message.new
    @message.message_assets.build
    @users = current_user.account.users
    
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @message }
    end
  end

  # GET /messages/1/edit
  def edit
    @message = Message.find(params[:id])
    if @message.message_assets.blank?
      @message.message_assets.build
    end
  end

  # POST /messages
  # POST /messages.json
  def create
    @message = Message.new(params[:message])
    @message.build_message_owner
    @message.message_owner.user_id = current_user.id

    respond_to do |format|
      if @message.valid?
        @message.save
        flash[:notice] = 'Message was successfully created.'
        format.html { redirect_to(@message)}
        format.json { render json: @message, status: :created, location: @message }
      else
        format.html { render action: "new" }
        format.json { render json: @message.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /messages/1
  # PUT /messages/1.json
  def update
    @message = Message.find(params[:id])

    respond_to do |format|
      if @message.update_attributes(params[:message])
        flash[:notice] = 'Message was successfully updated.'
        format.html { redirect_to(@message)}
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @message.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /messages/1
  # DELETE /messages/1.json
  def destroy
    @message = Message.find(params[:id])
    @message.destroy

    respond_to do |format|
      format.html { redirect_to messages_url }
      format.json { head :no_content }
    end
  end
end
