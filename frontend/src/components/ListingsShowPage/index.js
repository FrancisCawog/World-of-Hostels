import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchListing } from "../../store/listings"
import "./ListingShow.css"

function ListingsShowPage() {
    const dispatch = useDispatch();
    const { listingId } = useParams();
    const listing = useSelector((state) => state.listings[listingId]);
    
}