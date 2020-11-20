class WelcomeController < ApplicationController
  def index
  end

  def post
    data = request
    puts data
    url = data
    conn = Faraday.new(url)
    response = conn.post(url)
    puts "Success!"
    puts response.to_json
    render json: response
end

end
