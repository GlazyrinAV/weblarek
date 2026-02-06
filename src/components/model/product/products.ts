import {IProduct} from "../../../types";
import {IEvents} from "../../base/Events.ts";

export class Products {

    private products: IProduct[] = [];

    private currentProduct: IProduct | null = null;

    constructor(protected events: IEvents) {
    }

    public setAll(data: IProduct[]): void {
        data.forEach(item => this.products.push(item))
        this.events.emit('product:receivedCatalog');
    }

    public getAll(): IProduct[] {
        return Array.from(this.products);
    }

    public getById(id: string): IProduct | null {
        return Array.from(this.products).find(item => item.id === id) ?? null;
    }

    public setCurrentProduct(product: IProduct): void {
        this.currentProduct = product;
        this.events.emit('product:chosenCurrent')
    }

    public getCurrentProduct(): IProduct | null {
        return this.currentProduct
    }
}