import React, { useEffect, useState } from 'react';
import mailService from '../../api/mails-service';
import './Mails.css';
import ReactPaginate from 'react-paginate';
import MailIcon  from '../../assets/icon_mail_sp.svg';
import HeaderArrowIcon  from '../../assets/icon_arrow01.svg';
import MailArrowIcon  from '../../assets/icon_arrow02.svg';
import AttachementIcon from '../../assets/icon_clip.svg'
import MailBody from '../mail-body/MailBody';

function Mails() {
    const [mails, setMails] = useState([]);
    const [displayedMails, setDisplayedMails] = useState([]);
    const [pagination, setPagination] = useState({ offset: 0, perPage: 10, currentPage: 0, pageCount: 0 });
    const [currentMail, setCurrentMail] = useState(null);
    const [isBodyExpanded, setIsBodyExpanded] = useState(false);
    
      const paginate = (data) => {
        setDisplayedMails(data.slice(pagination.offset, pagination.offset + pagination.perPage));
        setPagination({ ...pagination, pageCount: Number(Math.ceil((data.length) / (pagination.perPage))) });

    }
    const loadMails = () => {
        let mails = mailService.getMails()
                setMails(mails);
                paginate(mails);
    };

    const truncate = (input, maxLength) => input.length > maxLength ? `${input.substring(0, maxLength)}...` : input;
    useEffect(() => {
        if (mails && mails.length > 0) {
            paginate(mails);
        }
        else {
            loadMails();
        }
    },[mails]);


const onRowSelected=(mail)=>{
    setCurrentMail(mail);
    setIsBodyExpanded(true);
}

const onMailClose=()=>{
    console.log('.. Close')
    setIsBodyExpanded(false);
}
    const handlePageChange = (e) => {
        const selectedPage = e.selected;
        setPagination({
            ...pagination,
            offset: selectedPage * pagination.perPage,
            currentPage: selectedPage
        });

        loadMails();
    };
    return (
        <div className="Mails">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <div className="mail-headers">Results: {displayedMails.length} mail(s)</div>
            </div>
            <div className="d-none d-lg-block">
                <div className="row">
                    <div className="col">
                    <div className="table-responsive">
                <table className="table table-sm">
                    <thead className="default-background">
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Subject</th>
                            <th>
                            <div className="row col-md-12 mr-1">Date 
      <img alt="" className="header-arrow-icon m-1" src={HeaderArrowIcon} />
      </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {displayedMails.map((mail) =>
                            <tr key={mail.id} onClick={() => onRowSelected(mail)}>
                                < td > {truncate(mail.from,15)} </td>
                                < td > 
                                <div className="row mr-4">
<div className="col"> {truncate(mail.to.join(' , '),15)} </div>
<div className="col-1">{  mail.repliesCount >0  &&  <span className="badge badge-secondary">+{mail.repliesCount}</span>}
            </div>
            </div>
                                </td>
                                < td > 
                                <div className="row mr-1">
<div className="col"> {truncate(mail.subject,60)} </div>
<div className="col-1">{  mail.hasAttachement  &&  <img alt="" className="mail-attachement-icon mr-2" src={AttachementIcon}  />}
            </div>
                                </div>
                              
                                
                             </td>
                                < td > <b>{mail.date}</b> </td>
                          </tr>
                        )}

                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pagination.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={10}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div>

                    </div>
                    {isBodyExpanded  &&  <div className="col-md-6 col-lg-6">
                        <MailBody mail={currentMail}  closeCallBack={onMailClose}></MailBody>
                    </div>}
                </div>
        
            </div>
            <div className="d-block d-lg-none">
            {isBodyExpanded  &&  <div className="col-md-6 col-lg-6">
                        <MailBody mail={currentMail}  closeCallBack={onMailClose}></MailBody>
                    </div>}
            <div className="card bg-light p-2">
  <div className="divider-container">
      <div className="row ml-3">
        <span className="mail-header-sm m-1"><div className="row mr-1">From 
      <img alt="" className="header-arrow-icon m-1" src={HeaderArrowIcon} />
      </div>
      </span>
        <span className="divider m-1" />   
        <span className="mail-header-sm m-1">To</span>
        <span className="divider m-1" />   
        <span className="mail-header-sm m-1">Subject</span>
        <span className="divider m-1" />   
        <span className="mail-header-sm m-1">Date</span>
        </div>
      </div>
</div> 
<div className="list-group">

{displayedMails.map((mail) =>

<div key={mail.id}  onClick={()=>{onRowSelected(mail)}} className="list-group-item list-group-item-action flex-column">
<div className="row mail-content-sm">
    <div className="col-1 mt-2">
    <img alt="" className="mail-icon" src={MailIcon} />
    </div>
    <div className="col">
    <div  className="d-flex w-100 justify-content-between">
        <div className="mail-from">{mail.from} </div>
        <div className="row">
        {  mail.hasAttachement  &&  <img alt="" className="mail-attachement-icon mr-2" src={AttachementIcon}  />
     } 
    <small>{mail.date}</small>
      <img  alt="" className="mail-arrow-icon m-1" src={MailArrowIcon}  />
        </div>
    </div>
    <div className="row">
    <div className="col">
    <small>{truncate(mail.to.join(' , '),35)}</small>
    </div>
    <div className="col-1 mr-2">
    <span className="badge badge-secondary">+{mail.repliesCount}</span>
    </div>
        </div>
   
    <p>{truncate(mail.subject,45)}</p>
</div>


</div>
</div>

                        )}

  
</div>
</div>
          
        </div>

    );
}

export default Mails;
