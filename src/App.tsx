import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./pages/home/homePage";
import { Layout } from "./components/nav/layout";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
