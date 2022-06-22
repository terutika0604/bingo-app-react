import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Master from "./routes/Master";
import Children from "./routes/Children";
import NotFound from "./routes/NotFound";
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/master/`} element={<Master />} />
        <Route path={`/children/`} element={<Children />} />
        <Route path={`*`} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;



