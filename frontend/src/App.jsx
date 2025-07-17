import "./App.css";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";

function App() {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 transition-all duration-500
    [background:radial-gradient(125%_125%_at_50%_10%,#f0f4f8_40%,#cbd5e1_70%,#dbeafe_100%)]
    dark:[background:radial-gradient(125%_125%_at_50%_10%,#0f0f0f_60%,#00FF9D30_100%)]"
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
