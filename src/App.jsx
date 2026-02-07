import PageNotFound from "components/commons/PageNotFound";
import Product from "components/Product";
import ProductList from "components/ProductList";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import routes from "routes";

// remaining imports

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
      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);
export default App;
