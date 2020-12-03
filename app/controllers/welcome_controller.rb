class WelcomeController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
  end

  def post
    puts "DATA"
    data = request.body.read
    puts "HERE!"
    puts data
    puts "NO HERE!"
    url = data
    response = Faraday.post(url)
    puts "Success!"
    puts response
    render plain: response.body
end

def joke
  jokes = Faraday.get("https://official-joke-api.appspot.com/jokes/random")
  puts "Success!"
  puts jokes
  render plain: jokes.body
end

end
