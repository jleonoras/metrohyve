class ListingClass {
  constructor({
    fname,
    lname,
    email,
    listingId,
    description,
    location,
    price,
    image1,
    image2,
    image3,
  }) {
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.listingId = listingId;
    this.description = description;
    this.location = location;
    this.price = price;
    this.image1 = image1;
    this.image2 = image2;
    this.image3 = image3;
  }
}

export default ListingClass;
