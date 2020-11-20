class WelcomeController < ApplicationController
  
  def index
  end

  def post
    puts "DATA"
    data = request
    puts "HERE!"
    puts data
    puts "NO HERE!"
    url = data
    response = Faraday.post(url)
    puts "Success!"
    puts response.to_json
    render json: response
end

end
