export class Product {
  public id: string;
  public title: string;
  public price: number;
  public description: string;
  public category: string;
  public image: string;
  public rating: Rating;


  constructor(private _id: string, private _title: string, private _price: number, private _description: string, private _category: string, private _image: string, private _rating: Rating){
    this.id = _id;
    this.title = _title;
    this.price = _price;
    this.description = _description;
    this.category = _category;
    this.image = _image;
    this.rating = _rating;
  }

  getKeys(): string[]
  {
    return Object.keys(Product);
  }
}

export type Rating = {
  rate: number;
  count: number;
}
