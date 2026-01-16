import {IProduct} from "../../../types";

export class Cart {

    private cart: Set<IProduct> = new Set<IProduct>();

    public getAll(): IProduct[] {
        return Array.from(this.cart);
    }

    public set(product: IProduct): void {
        this.cart.add(product);
    }

    public remove(id: string): void {
        const target: IProduct | undefined = Array.from(this.cart).find(item => item.id === id);
        if (target) {
            this.cart.delete(target);
        }
    }

    public clear(): void {
        this.cart.clear();
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