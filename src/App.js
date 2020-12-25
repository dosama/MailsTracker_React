import React from 'react';
import './App.css';
import Mails from './components/mails/Mails';
import Header from './components/header/Header';


function App() {
  return (

  <div  className="App">
    <Header></Header>
<div className="container-fluid">
  <div className="row">
   <div className="col">
   <main className="ml-sm-auto px-md-4">
     <Mails></Mails>
       </main>
 
   </div>
  </div>
</div>

 </div>

 );
}

export default App;
