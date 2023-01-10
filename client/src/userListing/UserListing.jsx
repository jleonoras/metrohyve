import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import ListingClass from "../listing/ListingClass";
import imageUrl from "../constants/constants";

const USER_LISTING_URL = "/api/v1/user/listing";
const DELETE_LISTING_API_URL = "/api/v1/listing";

const UserListing = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(USER_LISTING_URL, {
          withCredentials: true,
          credentials: "include",
          headers: {
            Accept: "applicaiton/json",
            "Content-Type": "application/json",
          },
        });

        const parseRes = await response.data.listing;

        const itemListing = parseRes.map((item) => {
          return new ListingClass({
            totalListing: item.totalListing,
            listingId: item.listing_id,
            description: item.description,
            location: item.location,
            price: item.price,
            image1: `${imageUrl}/${item.image1}`,
            image2: `${imageUrl}/${item.image2}`,
            image3: `${imageUrl}/${item.image3}`,
          });
        });

        setListings(itemListing);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  const deleteUserListing = async (id) => {
    try {
      await axios.delete(`${DELETE_LISTING_API_URL}/${id}`, {
        withCredentials: true,
        credentials: "include",
        headers: {
          Accept: "applicaiton/json",
          "Content-Type": "application/json",
        },
      });

      setListings(listings.filter((listing) => listing.listingId !== id));
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <section>
      <div className="pt-5">
        <ul className="list-unstyled">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {listings.length !== 0 &&
              listings[0].listingId !== null &&
              listings.map((item) => {
                return (
                  <li className="col" key={item.listingId}>
                    <div className="card h-100">
                      <figure className="figure">
                        <div
                          id={`carouselImage-${item.listingId}`}
                          className="carousel slide"
                          data-bs-ride="false"
                        >
                          <div className="carousel-indicators">
                            <button
                              type="button"
                              data-bs-target={`#carouselImage-${item.listingId}`}
                              data-bs-slide-to="0"
                              className="active"
                            ></button>
                            <button
                              type="button"
                              data-bs-target={`#carouselImage-${item.listingId}`}
                              data-bs-slide-to="1"
                            ></button>
                            <button
                              type="button"
                              data-bs-target={`#carouselImage-${item.listingId}`}
                              data-bs-slide-to="2"
                            ></button>
                          </div>
                          <div className="carousel-inner">
                            <div className="carousel-item active ratio ratio-4x3">
                              <img
                                src={item.image1}
                                alt={item.description}
                                loading="lazy"
                                className="card-img-top d-block w-100 img-fluid"
                              ></img>
                            </div>
                            <div className="carousel-item ratio ratio-4x3">
                              <img
                                src={item.image2}
                                alt={item.description}
                                loading="lazy"
                                className="card-img-top d-block w-100 img-fluid"
                              ></img>
                            </div>
                            <div className="carousel-item ratio ratio-4x3">
                              <img
                                src={item.image3}
                                alt={item.description}
                                loading="lazy"
                                className="card-img-top d-block w-100 img-fluid"
                              ></img>
                            </div>
                            {/* <!-- Controls --> */}
                            <button
                              className="carousel-control-prev"
                              type="button"
                              data-bs-target={`#carouselImage-${item.listingId}`}
                              data-bs-slide="prev"
                            >
                              <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                              ></span>
                              <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                              className="carousel-control-next"
                              type="button"
                              data-bs-target={`#carouselImage-${item.listingId}`}
                              data-bs-slide="next"
                            >
                              <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                              ></span>
                              <span className="visually-hidden">Next</span>
                            </button>
                          </div>
                        </div>
                      </figure>
                      <div className="card-body">
                        <div>
                          <div>
                            <strong>
                              {new Intl.NumberFormat("en-PH", {
                                currency: "PHP",
                                style: "currency",
                              }).format(`${item.price}`)}
                            </strong>
                          </div>
                          <div>
                            <p>{item.description}</p>
                            <p>{item.totalListing}</p>
                          </div>
                          <div>
                            <strong>{item.location}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="d-grid">
                        {/* <button
                        className="btn btn-warning bg-gradient col-md-4 m-3"
                        type="button"
                      >
                        Edit
                      </button> */}
                        <button
                          className="btn btn-danger bg-gradient m-3"
                          type="button"
                          onClick={() => deleteUserListing(item.listingId)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
          </div>
        </ul>
      </div>
    </section>
  );
};

export default UserListing;
