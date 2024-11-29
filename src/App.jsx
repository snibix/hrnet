import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import ListEmployee from "./pages/ListEmployee";
import NewEmployee from "./pages/NewEmployee";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/new-employee" element={<NewEmployee />} />
          <Route path="/employee-list" element={<ListEmployee />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
