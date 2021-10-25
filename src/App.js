import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Pricelist from "./components/Pricelist/Pricelist";
import FormAdd from "./components/FormAdd/FormAdd";
import Error from "./components/Error/Error";
import Skeleton from "./components/Skeleton/Skeleton";

const App = () => {

  return (
    <main>
        <Switch>
            <Route path="/" component={Pricelist} exact />
            <Route path="/add" component={FormAdd} />
            <Route path="/skeleton" component={Skeleton} />
            <Route component={Error} />
        </Switch>
    </main>
  );
};

export default App;