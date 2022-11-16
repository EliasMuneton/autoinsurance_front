import { useContext, useState, useEffect } from "react";
import BrandAdd from "../components/Brand/BrandAdd";
import BrandList from "../components/Brand/BrandList";
import BrandModal from "../components/Brand/BrandModal";
import useHttp from "../hooks/use-http";
import { getAllBrand } from "../lib/brand-api";
import AuthContext from "../store/auth-context";
import NotFound from "./NotFound";

const BrandsPage = () => {
  const {
    sendRequest,
    status,
    data: responseData,
    error,
  } = useHttp(getAllBrand);

  const [brands, setBrands] = useState();
  const [modalShowUpdate, setModalShowUpdate] = useState(false);
  const [brandUpdate, setBrandUpdate] = useState();

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    sendRequest(authCtx.token);
  }, []);

  useEffect(() => {
    if (status === "completed") {
      setBrands(Object.values(responseData));
    }
  }, [status, setBrands, responseData]);


  if (status === "completed" && (!responseData || responseData.length === 0)) {
    return <NotFound />;
  }

  const viewBrandHandler = (id) => {
    setModalShowUpdate(true);
    setBrandUpdate(brands.filter((brand) => brand.brandId === id));
  };

  const hideModalUpdate = () => {
    setModalShowUpdate(false);
  };

  const updateBrandHandler = (id, objRespose) => {
    setBrands(
      brands.map((obj) => {
        if (obj.brandId === id) {
          return objRespose;
        }
        return obj;
      })
    );
    hideModalUpdate();
  };

  const addBrandHandler = (objResponse) => {
    setBrands( [...brands, objResponse]);
  }

  return (
    <>
      <BrandAdd 
      onAddBrand={addBrandHandler}
      />
      <BrandList
        isLoading={status === "pending"}
        isError={error}
        dataBrands={brands}
        onViewBrand={viewBrandHandler}
      />
      <BrandModal
        showModal={modalShowUpdate}
        onHideModalUpdate={hideModalUpdate}
        brandData={brandUpdate}
        onBrandUpdate={updateBrandHandler}
      />
    </>
  );
};

export default BrandsPage;
