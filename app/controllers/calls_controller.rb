class CallsController < ApplicationController
  def create
    head :no_content
    ActionCable.server.broadcast("call_channel", call_params)
  end
  
  private
  
  def call_params
    params.permit(:call, :type, :from, :to, :sdp, :candida)
  end
end