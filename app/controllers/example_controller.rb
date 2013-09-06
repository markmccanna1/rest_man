class ExampleController < ApplicationController

  def create
    @example = Example.create(text: params[:example])
    redirect_to customer_profiles_path
  end

  def new_items
    examples = Example.all
    render :json => {examples: examples}
  end
end
