class ExampleController < ApplicationController


  def create
    puts params[:example]
    redirect_to customer_profiles_path
  end

  def new_items
    content_type :json
    {hi: "hi" }.to_json
  end

end
