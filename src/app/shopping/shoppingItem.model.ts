export class ShoppingItem {
  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
    public price: number,
    public tax: number,
    public quantity: number,
    public category: string
  ) {}
}
