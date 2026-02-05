import Home from "components/Home";
import PageNotFound from "components/PageNotFound";
import Product from "components/Product";
import { Route, Switch, NavLink } from "react-router-dom";
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
      <Route exact component={Home} path="/" />
      <Route exact component={Product} path="/product" />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);
export default App;
