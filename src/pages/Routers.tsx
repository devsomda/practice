import { Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import CssPseudoClass from "./CssPseudoClass";

export default function Routers() {
  return (
    <Routes>
      <Route path="/*" element={<MainPage />} />
      <Route path="/study/css-pseudo-class" element={<CssPseudoClass />} />
    </Routes>
  );
}
