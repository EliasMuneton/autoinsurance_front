import { Fragment } from "react";
import { Container } from "react-bootstrap";

import Table from "react-bootstrap/Table";
import BrandItem from "./BrandItem";

const BrandList = (props) => {
  let brands = props.dataBrands;
  return (
    <Fragment>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Brand Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands &&
              brands.map((brand) => (
                <BrandItem
                  key={brand["brandId"]}
                  id={brand["brandId"]}
                  brandName={brand["brandName"]}
                  onViewV={props.onViewBrand}
                />
              ))}
          </tbody>
        </Table>
      </Container>
    </Fragment>
  );
};

export default BrandList;
