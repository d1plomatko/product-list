import {FC} from "react";
import {CreateProductModal, Header} from "../components";
import {Outlet} from "react-router-dom";
import {Container} from "@mui/material";

const MainLayout:FC = () => {



    return (
        <div>
            <Header/>
            <Container sx={{marginTop: "100px"}}>
                <CreateProductModal/>
                <Outlet/>
            </Container>
        </div>
    )
}

export {MainLayout};