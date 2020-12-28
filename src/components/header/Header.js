import React from 'react';
import Search from '../search/Search';
import './Header.css';

function Header() {
  return (
  <div  className="Header">
   <header className="navbar sticky-top flex-md-nowrap p-4 shadow">
   <div className="col-md-6 col-lg-3">
   <Search></Search>
  </div>
</header>

 </div>

 );
}

export default Header;
