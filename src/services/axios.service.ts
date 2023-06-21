import axios, {AxiosResponse} from "axios";

import {baseURL} from "../constants/urls";

const axiosService = axios.create({baseURL});

export type AxiosRes<T> = Promise<AxiosResponse<T>>;

export {
    axiosService
};