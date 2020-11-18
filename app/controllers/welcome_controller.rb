class WelcomeController < ApplicationController
  def index
  end

  def post
    data = request.body.read
    puts data
    url = "https://api.wolframalpha.com/v2/query?appid=GRWHG2-8TQ9WK8J4J&input="
    conn = Faraday.new(url)
    response = conn.post(url,data,"Content-Type" => "application/json")
    puts "Success!"
    puts response.to_json
    render json: response
end

end
