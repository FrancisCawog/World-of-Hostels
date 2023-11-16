import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchListing } from "../../store/listings";
import "./ListingShow.css";

function ListingsShowPage() {
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings[listingId]);

  useEffect(() => {
    dispatch(fetchListing(listingId))
      .catch((error) => {
        console.error("Error fetching listing:", error);
      });
  }, [listingId, dispatch]);

  return (
    <>
      <div className="top-picture">
        {/* <h1>{listing.property_name}</h1> */}
      </div>
    </>
  );
}

export default ListingsShowPage;
