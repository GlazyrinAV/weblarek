import {IProduct} from "../../../types";

export class Products {

    private products: IProduct[] = [];

    private currentProduct: IProduct | null = null;

    public setAll(data: IProduct[]): void {
        data.forEach(item => this.products.push(item))
    }

    public getAll(): IProduct[] {
        return Array.from(this.products);
    }

    public getById(id: string): IProduct | null {
        return Array.from(this.products).find(item => item.id === id) ?? null;
    }

    public setCurrentProduct(product: IProduct): void {
        this.currentProduct = product;
    }

    public getCurrentProduct(): IProduct | null {
        return this.currentProduct
    }
}