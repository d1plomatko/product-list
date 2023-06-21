import {Grid} from "@mui/material";
import {useEffect} from "react";

import {ProductCard} from "../ProductCard/ProductCard";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks";
import {productActions} from "../../redux";

const ProductList = () => {

    const {products, reload} = useAppSelector(state => state.productReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
       dispatch(productActions.getAll())
    }, [dispatch, reload])

    return (
        <Grid container columnSpacing={2} rowSpacing={3}>
            {
                products.map(product => <ProductCard key={product.id} product={product}/>)
            }
        </Grid>
    )
}

export {ProductList};