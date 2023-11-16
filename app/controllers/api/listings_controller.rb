class Api::ListingsController < ApplicationController
    def index
        @listings = Listing.all
        render :index
    end

    def show
        @start_date = (params[:start_date]) || Date.today
        end_date = (params[:end_date]) || Date.tomorrow
        @end_date = end_date - 1

        @listing = Listing.find_by(id: params[:id])
        if @listing
            render :show
        else
            render json: {errors: @listing.errors.full_messages}, status: :unprocessable_entity
        end
    end
end