import React from 'react';
import { Route,BrowserRouter, Routes} from "react-router-dom";
import CameraWindow from './components/CameraWindow/CameraWindow';
import Home from './components/Home/Home';
import Template from './components/Template/Template';

function Routing() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/camera' element={<CameraWindow />} />
                <Route path='/template' element={<Template />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Routing