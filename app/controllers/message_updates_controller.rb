class MessageUpdatesController < ApplicationController
  # GET /message_updates
  # GET /message_updates.json
  def index
    @message_updates = MessageUpdate.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @message_updates }
    end
  end

  # GET /message_updates/1
  # GET /message_updates/1.json
  def show
    @message_update = MessageUpdate.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @message_update }
    end
  end

  # GET /messages/new
  # GET /messages/new.json
  def new
    @message_update = MessageUpdate.new
    @message = Message.find(params[:message_id])

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @message_update }
    end
  end

  # GET /messages/1/edit
  def edit
    @message_update = MessageUpdate.find(params[:id])
  end

  # POST /messages
  # POST /messages.json
  def create
    @message_update = MessageUpdate.new(params[:message_update])

    respond_to do |format|
      if @message_update.save
        format.html { redirect_to @message_update, notice: 'Message was successfully created.' }
        format.json { render json: @message_update, status: :created, location: @message_update }
      else
        format.html { render action: "new" }
        format.json { render json: @message_update.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /messages/1
  # PUT /messages/1.json
  def update
    @message_update = MessageUpdate.find(params[:id])

    respond_to do |format|
      if @message_update.update_attributes(params[:message_update])
        format.html { redirect_to @message_update, notice: 'Message was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @message_update.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /messages/1
  # DELETE /messages/1.json
  def destroy
    @message_update = MessageUpdate.find(params[:id])
    @message_update.destroy

    respond_to do |format|
      format.html { redirect_to message_updates_url }
      format.json { head :no_content }
    end
  end
end
