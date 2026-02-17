import {IApi, IApiController, IOrder, IOrderResult, IProduct, IProductList} from "../../../types";

export class ApiController implements IApiController {

    private readonly _api: IApi;

    constructor(api: IApi) {
        this._api = api;
    }

    public async findAll(): Promise<IProduct[]> {
        return this._api.get<IProductList>("/product/")
            .then(data => {
                return (data).items;
            })
            .catch(error => {
                throw new Error(error.message);
            })
    }

    public async save(order: IOrder): Promise<IOrderResult> {
        return this._api.post<IOrderResult>("/order/", order)
            .then(success => {
                return (success);
            })
            .catch(error => {
                throw new Error(error.message);
            })
    }
}