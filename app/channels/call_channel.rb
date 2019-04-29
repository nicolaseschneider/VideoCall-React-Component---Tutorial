class CallChannel < ApplicationCable::Channel
  def subscribed
     stream_from 'call_channel'
  end
  def unsubscribed; end
end
