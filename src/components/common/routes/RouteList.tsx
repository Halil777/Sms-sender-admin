import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import Home from "../../../pages/home/Home";
import Events from "../../../pages/events/Events";
import History from "../../../pages/history/History";
import Dashboard from "../../../pages/Dashboard";

const RouteList = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/history" element={<History />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default RouteList;
