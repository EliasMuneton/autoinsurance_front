import { Switch, Route } from "react-router-dom";

import { useContext } from "react";

import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AuthContext from "./store/auth-context";
import AddVehiclePage from "./pages/AddVehiclePage";
import VehiclesPage from "./pages/VehiclesPage";
import AddClaimPage from "./pages/AddClaimPage";
import ClaimsPage from "./pages/ClaimsPage";
import BrandsPage from "./pages/BrandsPage";
import ModelsPage from "./pages/ModelPage";
import ClaimSubjectsPage from "./pages/ClaimSubjectPage";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <>
            <Route path="/auth">
              <AuthPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
          </>
        )}
        {authCtx.isLoggedIn && (
          <>
            <Route path="/vehicle">
              <AddVehiclePage />
            </Route>
            <Route path="/vehicles">
              <VehiclesPage />
            </Route>
            <>
              {authCtx.user_role_id == 1 && (
                <>
                <Route path="/brand">
                  <BrandsPage />
                </Route>
                <Route path="/model">
                  <ModelsPage />
                </Route>
                <Route path="/claim_subject">
                  <ClaimSubjectsPage />
                </Route>
                </>
              )}
            </>

            <Route path="/claim">
              <AddClaimPage />
            </Route>
            <Route path="/claims">
              <ClaimsPage />
            </Route>
          </>
        )}
      </Switch>
    </Layout>
  );
}

export default App;
