import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Slides from "./components/Slides";
import Upload from "./components/Upload";
import AuditHistory from "./components/AuditHistory";
import AuditDetail from "./components/AuditDetail";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/recommendations" element={<Slides />} />
        <Route path="/audit" element={<AuditHistory />} />
        <Route path="/audit-detail/:id" element={<AuditDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
