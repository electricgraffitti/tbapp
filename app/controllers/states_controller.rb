class StatesController < ApplicationController

  before_filter :authenticate_user!

  def index
    @states = State.all
    render json: @states, each_serializer: StatesSerializer
  end
end