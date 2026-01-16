import {IProduct} from "../../../types";

export class Product {

    private products: IProduct[] = [];

    private currentProduct: IProduct | null = null;

    public setAll(data: IProduct[]): void {
        data.forEach(item => this.products.push(item))
    }

    public getAll(): IProduct[] {
        return Array.from(this.products);
    }

    public getById(id: string): IProduct | null {
        let product = Array.from(this.products).find(item => item.id === id);

        return product ? product : null;
    }

    public setCurrentProduct(product: IProduct): void {
        this.currentProduct = product;
    }

    public getCurrentProduct(): IProduct | null {
        return this.currentProduct
    }
}