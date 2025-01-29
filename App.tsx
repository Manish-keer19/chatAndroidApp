import { Provider } from "react-redux";
import { store } from "./src/Component/app/store";
import Entryroute from "./Entryroute";

export default function App() {
 

  return (
    <Provider store={store}>
      <Entryroute/>
    </Provider>
   
  );
}

