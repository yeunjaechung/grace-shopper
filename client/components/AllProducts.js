import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/allProducts";
import { Link } from "react-router-dom";
import AddProductForm from "./AddProductForm";

// Notice that we're exporting the AllCampuses component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    const products = this.props.products;
    if(this.props.user.userType === 'admin'){
      return (
        <div>
          <h1>All Products Component</h1>
          <AddProductForm />
          <hr />
          <div className="allProducts">
            {products.map((product) => (
              <div className="productChild" key={product.id}>
                <h1> {product.name} </h1>{" "}
                <img src={product.imageSmall} />
                <Link to={`/products/${product.id}`} key={product.id}>
                  <p>Link to Product page</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    }else{
      return (
        <div>
          <h1>All Products Component</h1>
          <div className="allProducts">
            {products.map((product) => (
              <div key={product.id}>
                <h1> {product.name} </h1>{" "}
                <img src={product.imageSmall} />
                <Link to={`/products/${product.id}`} key={product.id}>
                  <p>Link to Product page</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    user: state.auth
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
