class Api::ReservationsController < ApplicationController
    before_action :require_logged_in, only: [:create, :show, :update, :destroy]

    def show
        @reservation = Reservation.find(params[:id])
        if @reservation
            render :show
        else
            render json: {errors: @reservation.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def create
        @reservation = Reservation.new(reservation_params)
        @reservation.user_id = current_user.id
        if @reservation.save
            render :show
        else
            render json: {errors: @reservation.errors.full_messages}
        end
    end

    def update
        @reservation = Reservation.find(params[:id])
        if @reservation
            if(@reservation.user_id == current_user.id)
                if @reservation.update(reservation_params)
                    render :show
                else
                    render json: { errors: @reservation.errors.full_messages }, status: 422
                end
            else
                render json: {errors: @reservation.errors.full_messages}
            end
        else
            render json: {errors: @reservation.errors.full_messages}
        end
    end

    def destroy
        @reservation = Reservation.find(params[:id])
        @reservation.destroy
    end

    private

    def reservation_params
        params.require(:reservation).permit(:num_guests, :start_date, :end_date, :listing_id, :room_id, :refundable)
    end
end