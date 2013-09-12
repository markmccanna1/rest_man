class ChargesController < ApplicationController
	def new
	end

	def create
	  cart = Cart.find(session[:cart_id])

		@amount = (cart.total * 100).to_i
	 	customer = Stripe::Customer.create(email: current_customer_profile.user.email, card: params[:stripeToken])

	  charge = Stripe::Charge.create(customer: customer.id, amount: @amount, currency: 'usd')

	  redirect_to cart_path(cart)
		rescue Stripe::CardError => e
	  flash[:error] = e.message
	  redirect_to charges_path
	end
end
