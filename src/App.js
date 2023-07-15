
import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'




const App =()=> {
  const pageSize = 5;
 const  apikey="6f326020d3f14b309d5f713c7f589293"
 
// const apikey='oifm-IsFMcuZaPslt5yBSGMN-ydIOE-fL-c5_mZ9OI8'
 
const[progress,setProgress]=useState(0)


    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}

          />
          <Routes>

            <Route path="/" element={<News setProgress={setProgress} apikey={apikey} key="general" pageSize={pageSize} country="us" category="general" />} />
            <Route path="/general" element={<News setProgress={setProgress} key="general" pageSize={pageSize} apikey={apikey} country="us" category="general" />} />
            <Route exact path="/business" element={<News setProgress={setProgress}  key="business" pageSize={pageSize} apikey={apikey} country="us" category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress}  key="entertainment" pageSize={pageSize} apikey={apikey} country="us" category="entertainment" />} />
            <Route exact path="/health" element={<News setProgress={setProgress}  key="health" pageSize={pageSize}  apikey={apikey} country="us" category="health" />} />
            <Route exact path="/sports" element={<News setProgress={setProgress}  key="sports" pageSize={pageSize} apikey={apikey} country="us" category="sports" />} />
            <Route exact path="/science" element={<News setProgress={setProgress}  key="science" pageSize={pageSize}  apikey={apikey} country="us" category="science" />} />
            <Route exact path="/technology" element={<News setProgress={setProgress}  key="technology" pageSize={pageSize}  apikey={apikey} country="us" category="technology" />} />

          </Routes>
        </Router>
      </div>


    )
  
}

export default App;

