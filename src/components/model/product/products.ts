import {IProduct, IProductModel} from "../../../types";
import {IEvents} from "../../base/Events.ts";
import {EventsType} from "../../base/EventsType";

export class Products implements IProductModel {

    private readonly products: IProduct[] = [];

    private currentProduct: IProduct | null = null;

    constructor(protected events: IEvents) {
    }

    public setAll(data: IProduct[]): void {
        data.forEach(item => this.products.push(item))
        this.events.emit(EventsType.ProductNewCatalog);
    }

    public getAll(): IProduct[] {
        return Array.from(this.products);
    }

    public getById(id: string): IProduct | null {
        return Array.from(this.products).find(item => item.id === id) ?? null;
    }

    public setCurrentProduct(product: IProduct): void {
        this.currentProduct = product;
        this.events.emit(EventsType.ProductChooseCurrent)
    }

    public getCurrentProduct(): IProduct | null {
        return this.currentProduct
    }
}