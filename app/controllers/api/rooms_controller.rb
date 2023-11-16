class Api::RoomsController < ApplicationController
    before_action :require_logged_in, only: [:update]

    def index
        @rooms = Room.all
        render :index
    end

    def update

    end
end