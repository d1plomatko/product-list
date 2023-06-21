import {FC, useEffect} from "react";
import {Box, Button, Modal, Paper, TextField} from "@mui/material";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {IProduct} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks";
import {productActions} from "../../redux";
import {productValidator} from "../../validators/product.validator";



const CreateProductModal: FC = () => {

    const {handleSubmit, reset, control, formState: {errors, isValid}, setValue} = useForm<IProduct>({
        mode: "all",
        resolver: joiResolver(productValidator)
    })

    const {productForUpdate, openModal} = useAppSelector(state => state.productReducer);
    const dispatch = useAppDispatch();

    const closeModal = () => dispatch(productActions.setOpenModal(false))

    useEffect(() => {
        if (productForUpdate) {
            setValue("name", productForUpdate.name, {shouldValidate: false})
            setValue("imageUrl", productForUpdate.imageUrl, {shouldValidate: false})
            setValue("count", productForUpdate.count, {shouldValidate: false})
            setValue("weight", productForUpdate.weight, {shouldValidate: false})
            setValue("size.width", productForUpdate.size.width, {shouldValidate: false})
            setValue("size.height", productForUpdate.size.height, {shouldValidate: false})
        }
    }, [productForUpdate, setValue])
    const submit: SubmitHandler<IProduct> = async (data) => {
        if (!productForUpdate) {
            data.comments = []
            data.weight = data.weight + 'g'
            dispatch(productActions.create({product: data}))
        } else {
            dispatch(productActions.updateById({
                id: productForUpdate.id,
                product: {...data, comments: productForUpdate.comments}
            }))
        }
        reset()
        closeModal()
    }

    return (
        <Modal open={openModal} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
               onClose={closeModal}>
            <Box component={Paper} padding={'20px 15px'}>
                <Box component={"form"}
                     sx={{
                         display: 'flex',
                         flexDirection: 'column',
                         justifyContent: 'center',
                         alignItems: 'center',
                         gap: '15px'
                     }}
                     onSubmit={handleSubmit(submit)}
                >
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label={'Name'}
                                value={value}
                                onChange={onChange}
                                error={!!errors.name}
                                helperText={errors.name ? errors.name?.message : null}
                            />
                        )}
                    />

                    <Controller
                        name="imageUrl"
                        control={control}
                        defaultValue=""
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label={'Image URL'}
                                value={value}
                                onChange={onChange}
                                error={!!errors.imageUrl}
                                helperText={errors.imageUrl ? errors.imageUrl?.message : null}
                            />
                        )}
                    />

                    <Controller
                        name="count"
                        control={control}
                        defaultValue={1}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label={'Count'}
                                type={"number"}
                                value={value}
                                onChange={onChange}
                                error={!!errors.count}
                                helperText={errors ? errors.count?.message : null}
                            />
                        )}
                    />

                    <Controller
                        name="size.width"
                        control={control}
                        defaultValue={0}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label={'Width'}
                                type={"number"}
                                value={value}
                                onChange={onChange}
                                error={!!errors.size?.width}
                                helperText={errors.size?.width ? errors.size?.width?.message : null}
                            />
                        )}
                    />

                    <Controller
                        name="size.height"
                        control={control}
                        defaultValue={0}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                label={'Height'}
                                type={"number"}
                                value={value}
                                onChange={onChange}
                                error={!!errors.size?.height}
                                helperText={errors.size?.height ? errors.size?.height?.message : null}
                            />
                        )}
                    />

                    <Controller
                        name="weight"
                        control={control}
                        defaultValue={"0"}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                type={"number"}
                                label={'Weight'}
                                value={value}
                                onChange={onChange}
                                error={!!errors.weight}
                                helperText={errors.weight ? errors.weight?.message : null}
                            />
                        )}
                    />


                    <Button type={"submit"} variant={'contained'}
                            disabled={!isValid}>Confirm</Button>
                </Box>

                <Button onClick={closeModal}>Cancel</Button>
            </Box>
        </Modal>
    )
}

export {CreateProductModal};