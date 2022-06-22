import './App.css';
import {Header} from "./components/layout/Header/Header.js"
import {Home} from "./components/layout/Home/Home.js"
import {BrowserRouter, Route} from "react-router-dom"
import WebFont from "webfontloader";
import { useEffect } from 'react';


function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    // store.dispatch(loadUser());

    // getStripeApiKey();
  }, []);


  return (
   <BrowserRouter>
    <Header>
      <Route path='/' element={Home}></Route>
    </Header>
    <Footer/>
   </BrowserRouter>
   
   
  );
}

export default App;
