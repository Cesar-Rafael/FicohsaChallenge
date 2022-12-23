import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchBox from "./pages/SearchBox";
import Results from "./pages/Results";
import Detail from "./pages/Detail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchBox />} />
        <Route path="/items" element={<Results />} />
        <Route path="/items/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}
