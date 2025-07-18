import Country from "./Country";

class House {
  id: number;
  address: string;
  country: string;
  price: number;
  photo: string;
  description: string;

  constructor(id: number, address: string, country: string, price: number, photo: string = "", description: string = "") {
    this.id = id;
    this.address = address;
    this.country = country;
    this.price = price;
    this.photo = photo;
    this.description = description;
  }

  static Random(id: number): House {
    const address = `Random Address ${id}`;
    const country = Country.Random();
    const price = Math.floor(Math.random() * 1000000) + 100000;

    return new House(id, address, country, price);
  }
}

export default House;