import React from 'react';
import {Route} from "react-router-dom";

import './App.css';

//Components
import HeaderContainer from "./components/Header/HeaderContainer";
import BodyContainer from "./components/MainBody/BodyContainer";
import Footer from "./components/Footer/Footer";
import AdminPanelContainer from "./components/AdminPanel/AdminPanelContainer";

function App() {

  return (
      <>
          <Route exact path='/' render={
              () => {
                  return (
                      <div className="wrapper">
                          <div className="wrapper__inner">
                              <HeaderContainer/>
                              <BodyContainer/>
                          </div>
                          <Footer/>
                      </div>
                  )
              }
          }/>
          <Route path='/admin' render={
              () => {
                  return (
                      <AdminPanelContainer/>
                  );
              }
          }/>
    </>
  );
}

export default App;
