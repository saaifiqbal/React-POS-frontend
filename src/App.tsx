import { BrowserRouter } from "react-router-dom";
import { AppRoute } from "./utils";
import { Provider } from "react-redux";
import store from "./store/store";
import { SnackbarProvider } from "./hooks/SnackBarProvider";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider>
          <AppRoute />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
