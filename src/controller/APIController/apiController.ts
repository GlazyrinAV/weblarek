import {IApi, IBuyer, IOrder, IOrderSuccess, IProduct, IProductList} from "../../types";

export class ApiController {

    private _order: IOrder | null;

    private _api: IApi;

    constructor(api: IApi) {
        this._api = api;
        this._order = null;
    }

    public async findAll(): Promise<IProduct[]> {
        return this._api.get("/product/")
            .then(data => {
                return (data as IProductList).items;
            })
            .catch(error => {
                throw new Error(error.message);
            })
    }

    public save(buyer: IBuyer, products: IProduct[]): Promise<IOrderSuccess> {
        let sum = 0;
        products.map(item => {
            if (item.price) {
                sum += item.price;
            }
        });

        this._order = {
            ...buyer,
            total: sum,
            items: products.map(item => {
                return item.id
            })
        }

        return this._api.post("/order/", this._order)
            .then(success => {
                return (success as IOrderSuccess);
            })
            .catch(error => {
                throw new Error(error.message);
            })
    }
}