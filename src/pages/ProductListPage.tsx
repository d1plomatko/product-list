import {FC} from "react";

import { ProductList} from "../components";
import {Button} from "@mui/material";
import {useAppDispatch} from "../hooks/redux.hooks";
import {productActions} from "../redux";

const ProductListPage: FC = () => {


    const dispatch = useAppDispatch()


    return (
        <>
            <Button variant={"contained"} onClick={() => dispatch(productActions.setOpenModal(true))}>Add Product</Button>
            <ProductList/>
        </>
    )
}

export {ProductListPage};