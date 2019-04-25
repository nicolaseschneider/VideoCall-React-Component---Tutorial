class CallChannel < ApplicationCable::Channel
  def subscribed
     stream_for 'call_channel'
  end
  def unsubscribed; end
end
