import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import './App.scss';
import Home from './components/pages/Home/Home';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
