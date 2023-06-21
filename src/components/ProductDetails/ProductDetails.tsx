import {FC} from "react";
import {Avatar, Button, Grid, Table, TableBody, TableCell, TableRow, Typography} from "@mui/material";

import {IProduct} from "../../interfaces";
import {useAppDispatch} from "../../hooks/redux.hooks";
import {productActions} from "../../redux";

interface IProps {
    product: IProduct
}

const ProductDetails: FC<IProps> = ({product}) => {


    const {name, imageUrl, count, weight, size: {width, height}} = product;

    const dispatch = useAppDispatch();

    const editProduct = (productToUpdate: IProduct) => {
        dispatch(productActions.setProductForUpdate(productToUpdate))
        dispatch(productActions.setOpenModal(true))
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant={'h3'}>{name}</Typography>

            </Grid>

            <Grid item lg={6}>
                <Avatar src={imageUrl} alt={name} sx={{width: "75%", height: "auto"}}/>
            </Grid>

            <Grid item lg={6}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography fontWeight={'bolder'}>
                                    Weight:
                                </Typography>
                            </TableCell>
                            <TableCell>{weight}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <Typography fontWeight={'bolder'}>
                                    Width:
                                </Typography>
                            </TableCell>
                            <TableCell>{width}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <Typography fontWeight={'bolder'}>
                                    Height:
                                </Typography>
                            </TableCell>
                            <TableCell>{height}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <Typography fontWeight={'bolder'}>
                                    Count:
                                </Typography>
                            </TableCell>
                            <TableCell>{count}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Grid>

            <Grid item>
                <Button variant={'contained'} onClick={() => editProduct(product)}>Edit</Button>
            </Grid>

        </Grid>
    )
}

export {ProductDetails};