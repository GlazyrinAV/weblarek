import {IProduct} from "../../types";

export class Product {

    private _products: Set<IProduct>;

    private _currentProduct: IProduct | null = null;

    constructor() {
        this._products = new Set<IProduct>();
        this._currentProduct = null;
    }

    public saveAll(data: IProduct[]): IProduct[] {
        data.forEach(item => this._products.add(item))
        return Array.from(this._products);
    }

    public findAll(): IProduct[] {
        return Array.from(this._products);
    }

    public findById(id: string): IProduct {
        let product = Array.from(this._products).find(item => item.id === id);

        if (product) {
            return product;
        } else {
            throw new Error(`Товар с Id: ${id} не найден.`)
        }
    }

    public saveCurrentProduct(id: string): IProduct {
        let product: IProduct | null = this.findById(id);

        if (product) {
            this._currentProduct = product;
            return this._currentProduct;
        } else {
            throw new Error(`Товар с Id: ${id} не найден.`)
        }
    }

    public findCurrentProduct(): IProduct {
        if (this._currentProduct) {
            return this._currentProduct;
        } else {
            throw new Error("Текущий товар не выбран");
        }
    }
}