import React ,{useState}from 'react';
import './Search.css';

function Search() {
  const [value, setValue] = useState('2019/12/31 - 2020/1/3');
 
  return (
  <div  className="Search w-100">
     
     <div className="headerSearch__calendarwrap">
     <button className="headerSearch__calendar sc-ir" >Calendar</button>
   </div>
    <input defaultValue={value}></input>
      <div className="headerSearch__submitwrap">
      <button className="headerSearch__submit sc-ir">Search</button>
      </div>

 </div>

 );
}

export default Search;
