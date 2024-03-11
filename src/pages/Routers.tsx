import { Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import CssPseudoClass from "./CssPseudoClass";
import VersionAlert from "./VersionAlert";

export default function Routers() {
  return (
    <Routes>
      <Route path="/*" element={<MainPage />} />
      <Route path="/practice/css-pseudo-class" element={<CssPseudoClass />} />
      <Route path="/practice/version-alert" element={<VersionAlert />} />
    </Routes>
  );
}
