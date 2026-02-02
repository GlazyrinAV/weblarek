import {IApi, IOrder, IOrderResult, IProduct, IProductList} from "../../../types";

export class ApiController {

    private _api: IApi;

    constructor(api: IApi) {
        this._api = api;
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

    public async save(order: IOrder): Promise<IOrderResult> {
        return this._api.post("/order/", order)
            .then(success => {
                return (success as IOrderResult);
            })
            .catch(error => {
                throw new Error(error.message);
            })
    }
}