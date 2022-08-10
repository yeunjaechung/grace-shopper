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
    if (this.props.user.userType === "admin") {
      return (
        <section className="bg-green container" id="carousel">
          <h1 className="anchor-container">Welcome Administrator! Try not to delete anything important</h1>
          <AddProductForm />
          <hr />
          <div className="allProducts">
            {products.map((product) => (
              <div className="prodBox" key={product.id}>
                <Link to={`/products/${product.id}`} key={product.id}>
                  <h1 className="center"> {product.name} </h1>{" "}
                  <img src={product.imageSmall} />
                  <p className="center">National Pokedex</p>
                  <p className="center">
                    Number: {product.nationalPokedexNumbers}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      );
    } else {
      return (
        <section className="bg-whiteblue container" id="carousel">
          <h1>Gotta Collect 'em All!</h1>
          <div className="allProducts">
            {products.map((product) => (
              <div className="prodBox" key={product.id}>
                <Link to={`/products/${product.id}`} key={product.id}>
                  <h1 className="center"> {product.name} </h1>
                  <img src={product.imageSmall} />
                  <p className="center">National Pokedex</p>
                  <p className="center">
                    Number: {product.nationalPokedexNumbers}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      );
    }
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
