import {FC, useEffect, useState} from "react";
import {ProductDetails} from "../components";
import {useParams} from "react-router-dom";
import {productService} from "../services";
import {IProduct} from "../interfaces";
import {useAppSelector} from "../hooks/redux.hooks";

const ProductDetailsPage:FC = () => {

    const {id} = useParams()

    const {reload} = useAppSelector(state => state.productReducer)
    const [product, setProduct] = useState<IProduct>(null);

    useEffect(() => {
        productService.getById(id!).then(({data}) => setProduct(data))
    }, [id, reload])

    return (
        <>
            {product &&  <ProductDetails product={product}/>}
        </>
    )
}

export {ProductDetailsPage};