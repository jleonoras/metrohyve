import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const ALL_LISTING_URL = "/api/v1/listing";

const AllListing = () => {
  const [allListing, setAllListing] = useState([]);
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [pesoSign, setPesoSign] = useState("");
  const [itemLocation, setItemLocation] = useState("");

  const getAllListing = async () => {
    try {
      const response = await axios.get(ALL_LISTING_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const parseRes = await response?.data;

      const allListing = parseRes.map((item) => {
        class Listing {
          constructor({ listing_id, description, location, price, image1 }) {
            this.listing_id = listing_id;
            this.description = description;
            this.location = location;
            this.price = price;
            this.image1 = image1;
          }
        }
        return new Listing({
          listing_id: item.listing_id,
          description: item.description,
          location: item.location,
          price: item.price,
          image1: item.image1,
        });
      });

      setAllListing(allListing);
      setItemDescription("Description:");
      setItemPrice("Price:");
      setPesoSign("₱");
      setItemLocation("Location:");

      // console.log(parseRes);
    } catch (error) {
      console.log(error);
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllListing();
  }, []);

  return (
    <section>
      <div>
        <ul>
          {allListing.length !== 0 &&
            allListing[0].listing_id !== null &&
            allListing.map((item) => {
              return (
                <li key={item.listing_id}>
                  <figure>
                    <img
                      src={item.image1}
                      alt={item.description}
                      loading="lazy"
                    ></img>
                  </figure>
                  <div>
                    <h3>{itemPrice}</h3>
                    <p>
                      {pesoSign}
                      {item.price}
                    </p>
                  </div>
                  <div>
                    <h3>{itemDescription}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <h3>{itemLocation}</h3>
                    <p>{item.location}</p>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};

export default AllListing;