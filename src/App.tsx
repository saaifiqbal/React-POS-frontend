import { BrowserRouter } from "react-router-dom";
import { AppRoute } from "./utils";
import { Provider } from "react-redux";
import store from './store/store';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
