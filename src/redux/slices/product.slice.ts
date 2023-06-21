import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProduct} from "../../interfaces";
import {AxiosError} from "axios";
import {productService} from "../../services";

interface IState {
    products: IProduct[],
    reload: boolean,
    productForUpdate: IProduct,
    openModal: boolean
}

const initialState: IState = {
    products: [],
    reload: false,
    productForUpdate: null,
    openModal: true
}

const getAll = createAsyncThunk<IProduct[], void>(
    'productSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await productService.getAll()
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
);

const create = createAsyncThunk<IProduct, {product: IProduct}>(
    'productSlice/create',
    async ({product}, {rejectWithValue}) => {
        try {
            const {data} = await productService.create(product)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
);
const updateById = createAsyncThunk<IProduct, {id: number, product: IProduct}>(
    'productSlice/updateById',
    async ({id, product}, {rejectWithValue}) => {
        try {
            const {data} = await productService.updateById(id, product)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
);

const deleteById = createAsyncThunk<void, {id: number}>(
    'productSlice/deleteById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await productService.deleteById(id)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
);

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setProductForUpdate: (state, action: PayloadAction<IProduct>) => {
            state.productForUpdate = action.payload
        },
        setOpenModal: (state, action: PayloadAction<boolean>) => {
            state.openModal = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(create.fulfilled, (state, action) => {
                state.reload = !state.reload
            })
            .addCase(deleteById.fulfilled, (state, action) => {
                state.reload = !state.reload
            })
            .addCase(updateById.fulfilled, (state, action) => {
                state.reload = !state.reload
                state.productForUpdate = null
                state.openModal = false
            })
})


const {reducer: productReducer, actions} = productSlice;

const productActions = {
    ...actions,
    getAll,
    create,
    deleteById,
    updateById
};

export {
    productReducer,
    productActions
}