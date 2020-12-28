import React from 'react';
import { ArrowLeft,X } from 'react-feather';
import './MailBody.css';

function MailBody(props) {
  return (
<div  className="mail-body">
    <div className="row col-md-12">
        <button  class="btn btn-info btn-sm d-block d-lg-none" onClick={()=>{props.closeCallBack()}}>
          <span><ArrowLeft></ArrowLeft></span> Back
        </button>
 
        <button  class="btn btn-danger btn-sm d-none d-lg-block" onClick={()=>{props.closeCallBack()}}>
          <span><X></X></span> Close
        </button>
 
    <div className="row col-md-12 mt-2">
        <div className="col-sm-4 col-lg-4 mail-headers">Date:</div>
        <div className="col-sm-8 col-lg-8">{props.mail.date}</div>
        </div>
        <div className="row col-md-12">
            <div className="col-sm-4 col-lg- mail-headers">From:</div><div className="col-sm-8 col-lg-8">{props.mail.from}</div></div>
        <div className="row col-md-12">
            <div className="col-sm-4 col-lg-4 mail-headers">To:</div>
            <div className="col-sm-8 col-lg-8">{props.mail.to}
            </div>
            </div>
        <div className="row col-md-12 ml-2 mt-2">{props.mail.mailBody}</div>
    </div>
 </div>

 );
}

export default MailBody;
