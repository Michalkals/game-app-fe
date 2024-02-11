import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;