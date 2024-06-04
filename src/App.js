import React from "react";
import Landing from "./Component/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookShelf from "./Component/BookShelf";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/bookshelf" element={<BookShelf />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
