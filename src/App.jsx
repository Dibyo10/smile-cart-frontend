import Cart from "components/Cart";
import Checkout from "components/Checkout";
import PageNotFound from "components/commons/PageNotFound";
import Product from "components/Product";
import ProductList from "components/ProductList";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import routes from "routes";

const App = () => (
  <>
    <div className="mx-4 flex space-x-2">
      <NavLink exact className="font-bold underline" to="/">
        Home
      </NavLink>
      <NavLink exact className="font-bold underline" to="/product">
        Product
      </NavLink>
    </div>
    <Switch>
      <Route exact component={Product} path={routes.products.show} />
      <Route exact component={ProductList} path={routes.products.index} />
      <Redirect exact from={routes.root} to={routes.products.index} />
      <Route exact component={Cart} path={routes.cart} />
      <Route exact component={Checkout} path={routes.checkout} />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);
export default App;
