import {IProduct} from "../../types";

export class Cart {

    private _cart: Set<IProduct>;

    constructor() {
        this._cart = new Set<IProduct>();
    }

    public findAll(): IProduct[] {
        return Array.from(this._cart);
    }

    public save(product: IProduct): IProduct[] {
        this._cart.add(product);
        return Array.from(this._cart);
    }

    public remove(id: string): void {
        let target: IProduct | undefined = Array.from(this._cart).find(item => item.id === id);
        if (target) {
            this._cart.delete(target);
        }
    }

    public clear(): void {
        this._cart = new Set<IProduct>();
    }

    public findTotalPrice(): number {
        let totalPrice: number = 0;
        Array.from(this._cart).map(item => {
            if (item.price) {
                totalPrice += item.price;
            }
        })
        return totalPrice;
    }

    public findTotalCount(): number {
        return this._cart.size;
    }

    public isProductInCart(id: string): boolean {
        let target: IProduct | undefined = Array.from(this._cart).find(item => item.id === id);
        return !!target;
    }
}