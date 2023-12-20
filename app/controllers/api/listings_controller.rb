class Api::ListingsController < ApplicationController
    def index
        @listings = Listing.all
        render :index
    end

    def show
        @listing = Listing.find_by(id: params[:id])
        
        @start_date = (params[:start_date]) || Date.today
        @end_date = (params[:end_date]&.to_date || Date.tomorrow).prev_day
        
        if @listing
            render :show
          else
            render json: { errors: @listing.errors.full_messages }, status: :unprocessable_entity
          end
        rescue StandardError => e
          render json: { error: e.message }, status: :internal_server_error
        end
end