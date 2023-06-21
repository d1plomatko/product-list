import {Navigate, Route, Routes} from "react-router-dom";

import {MainLayout} from "./layouts/MainLayout";
import {ProductDetailsPage, ProductListPage} from "./pages";

const App = () => {

    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<Navigate to={'/products'}/>}/>
                <Route path={'products'} element={<ProductListPage/>}/>
                <Route path={'products/:id'} element={<ProductDetailsPage/>}/>
            </Route>
        </Routes>
    )
}

export default App;