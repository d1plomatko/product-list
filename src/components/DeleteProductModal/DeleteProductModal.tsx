import {FC} from "react";
import {Box, Button, Modal, Paper, Typography} from "@mui/material";

interface IProps {
    open: boolean,
    setOpen: (state: boolean) => void,
    deleteProduct: () => void
}

const DeleteProductModal:FC<IProps> = ({setOpen, open, deleteProduct}) => {


    return (
        <Modal open={open} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Box component={Paper} padding={'25px'}>
                <Typography>Are you sure you want to delete this product?</Typography>
                <Button onClick={deleteProduct}>Delete</Button>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
            </Box>
        </Modal>
    )
}

export {DeleteProductModal};