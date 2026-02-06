import PageNotFound from "components/commons/PageNotFound";
import Product from "components/Product";
import ProductList from "components/ProductList";
import { NavLink, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

// remaining imports

const App = () => (
  <>
    <div className="mx-4 flex space-x-2">
      <NavLink exact clasName="underline font-bold" to="/">
        Home
      </NavLink>
      <NavLink exact clasName="underline font-bold" to="/product">
        Product
      </NavLink>
    </div>
    <Switch>
      <Route exact component={ProductList} path="/products" />
      <Route exact component={Product} path="/products/:slug" />
      <Redirect exact from="/" to="/products" />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);
export default App;
