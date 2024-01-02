class Api::ReviewsController < ApplicationController
    before_action :require_logged_in, only: [:create, :show]

    def show
        @review = Review.find(params[:id])
        if @review
            render :show
        else
            render json: {errors: @review.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def create
        @review = Review.new(review_params)
        @review.user_id = current_user.id
        if @review.save
            render :show
        else
            render json: {errors: @review.errors.full_messages}
        end
    end

    private

    def review_params
        params.require(:review).permit(:listing_id, :reservation_id, :security, :cleanliness, :location, :facilities, :staff, :value_for_money, :atmosphere, :about_you, :total_score, :age_group, :trip_type, :feedback)
    end
end