import {AxiosRes, axiosService} from "./axios.service";
import {urls} from "../constants/urls";
import {IProduct} from "../interfaces";

const productService = {
    getAll: (): AxiosRes<IProduct[]> => axiosService.get(urls.products),
    getById: (id: string): AxiosRes<IProduct> => axiosService.get(`${urls.products}/${id}`),
    create: (product: IProduct): AxiosRes<IProduct> => axiosService.post(urls.products, product),
    updateById: (id: number, product: IProduct): AxiosRes<IProduct> => axiosService.put(`${urls.products}/${id}`, product),
    deleteById: (id: number) => axiosService.delete(`${urls.products}/${id}`)

};

export {
    productService
};