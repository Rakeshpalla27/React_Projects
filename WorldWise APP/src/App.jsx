import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Pagenotfound from "./pages/Pagenotfound";
import Applayout from "./pages/Applayout";
import Login from "./pages/Login";
import Citylist from "./components/Citylist";
import Countrylist from "./components/Countrylist";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <Applayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<Citylist />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<Countrylist />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<Pagenotfound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
