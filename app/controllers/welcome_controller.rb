class WelcomeController < ApplicationController
  def index
  end

  def post
    data = request
    puts data
    url = data
    response = Faraday.post(url)
    puts "Success!"
    puts response.to_json
    render json: response
end

def get
    data = request.raw_post
    puts data
    url = data
    response = Faraday.get("https://api.wolframalpha.com/v2/query?appid=GRWHG2-8TQ9WK8J4J&input=sin%20x&output=json")
    puts "Success!"
    puts response.to_json
    render json: response
end

end
