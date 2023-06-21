import {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";

import {IProduct} from "../../interfaces";
import {DeleteProductModal} from "../DeleteProductModal/DeleteProductModal";
import {useAppDispatch} from "../../hooks/redux.hooks";
import {productActions} from "../../redux";

interface IProps {
    product: IProduct
}

const ProductCard:FC<IProps> = ({product}) => {

    const {id, name, imageUrl} = product

    const [open, setOpen] = useState<boolean>(false)

    const dispatch = useAppDispatch();
    const deleteProduct =  () => {
        dispatch(productActions.deleteById({id}))
        setOpen(false)
    }


    const navigate = useNavigate()

    return (
        <Grid item lg={3}>
            <DeleteProductModal open={open} setOpen={setOpen} deleteProduct={deleteProduct}/>

            <Card>
                <CardActionArea onClick={() => navigate(`/products/${id}`)}>
                    <CardMedia image={imageUrl} component={'img'} alt={name}/>
                </CardActionArea>

                <CardContent>
                    <Typography>{name}</Typography>
                </CardContent>

                <CardActions>
                    <Button onClick={() => setOpen(true)}>Delete</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export {ProductCard};