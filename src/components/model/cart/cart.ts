import {ICartModel, IProduct} from "../../../types";
import {IEvents} from "../../base/Events.ts";
import {EventsType} from "../../base/EventsType";

export class Cart implements ICartModel {

    private cart: Set<IProduct> = new Set<IProduct>();

    constructor(protected events: IEvents) {
    }

    public getAll(): IProduct[] {
        return Array.from(this.cart);
    }

    public set(product: IProduct): void {
        this.cart.add(product);
        this.events.emit(EventsType.CartChange);
    }

    public remove(id: string): void {
        const target: IProduct | undefined = Array.from(this.cart).find(item => item.id === id);
        if (target) {
            this.cart.delete(target);
            this.events.emit(EventsType.CartChange);
        }
    }

    public clear(): void {
        this.cart.clear();
        this.events.emit(EventsType.CartEmpty);
    }

    public getTotalPrice(): number {
        return Array.from(this.cart).reduce((total: number, item: IProduct) => {
            if (item.price) {
                return total + item.price;
            } else {
                return total;
            }
        }, 0);
    }

    public getTotalCount(): number {
        return this.cart.size;
    }

    public isProductInCart(id: string): boolean {
        return Array.from(this.cart).some(item => item.id === id);
    }
}