class WelcomeController < ApplicationController
  def index
  end

  def post
    data = request.body.read
    puts data
    url = data
    response = Faraday.get("https://api.wolframalpha.com/v2/query?appid=GRWHG2-8TQ9WK8J4J&input=sin%20x&output=json")
    puts "Success!"
    puts response
    render text: response
end

def get
    data = request.body.read
    puts data
    url = data
    response = Faraday.get("https://api.wolframalpha.com/v2/query?appid=GRWHG2-8TQ9WK8J4J&input=sin%20x&output=json")
    puts "Success!"
    puts response
    render text: response
end

end
