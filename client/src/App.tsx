import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "@/pages/Landing";
import Todos from "@/pages/Todos";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
