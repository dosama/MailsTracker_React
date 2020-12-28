import React, { useEffect, useState } from 'react';
import mailService from '../../api/mails-service';
import './Mails.css';
import ReactPaginate from 'react-paginate';
import mailSearchEvent from '../events/mail-search-event';
import MailIcon  from '../../assets/icon_mail_sp.svg';
import MailArrowIcon  from '../../assets/icon_arrow02.svg';
import AttachementIcon from '../../assets/icon_clip.svg'

function Mails() {
    const [mails, setMails] = useState([]);
    const [displayedMails, setDisplayedMails] = useState([]);
    const [pagination, setPagination] = useState({ offset: 0, perPage: 10, currentPage: 0, pageCount: 0 });
    
    mailSearchEvent
      .on('mailSearchCompleted', selectedMailValue => {
      
        const displayedMails = selectedMailValue ? mails.filter(mail => mail.id == selectedMailValue): mails;
        setDisplayedMails(displayedMails);
        paginate(displayedMails);
         
      } );
    
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
    }, [mails]);



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
            <div className="table-responsive">
                <table className="table table-sm">
                    <thead className="default-background">
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Subject</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>

                        {displayedMails.map((mail) =>
                            <tr key={mail.id}>
                                < td > {truncate(mail.from,15)} </td>
                                < td > 
                                <div className="row mr-4">
<div className="col"> {truncate(mail.to.join(' , '),15)} </div>
<div className="col-1">{  mail.repliesCount >0  &&  <span class="badge badge-secondary">+{mail.repliesCount}</span>}
            </div>
            </div>
                                </td>
                                < td > 
                                <div className="row mr-1">
<div className="col"> {truncate(mail.subject,60)} </div>
<div className="col-1">{  mail.hasAttachement  &&  <img className="mail-attachement-icon mr-2" src={AttachementIcon}  />}
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
            <div className="d-block d-lg-none">
            <div className="card bg-light p-2">
  <div class="divider-container">
        <span className="mail-header-sm">From</span>
        <span class="divider" />   
        <span className="mail-header-sm">To</span>
        <span class="divider" />   
        <span className="mail-header-sm">Subject</span>
        <span class="divider" />   
        <span className="mail-header-sm">Date</span>
      </div>
</div> 
<div className="list-group">

{displayedMails.map((mail) =>

<div key={mail.id} href="#" className="list-group-item list-group-item-action flex-column">
<div className="row mail-content-sm">
    <div className="col-1 mt-2">
    <img className="mail-icon" src={MailIcon} />
    </div>
    <div className="col">
    <div  className="d-flex w-100 justify-content-between">
        <div className="mail-from">{mail.from}</div>
        <div className="row">
        {  mail.hasAttachement  &&  <img className="mail-attachement-icon mr-2" src={AttachementIcon}  />
     } 
    <small>{mail.date}</small>
      <img className="mail-arrow-icon m-1" src={MailArrowIcon}  />
        </div>
    </div>
    <div className="row">
    <div className="col">
    <small>{truncate(mail.to.join(' , '),35)}</small>
    </div>
    <div className="col-1 mr-2">
    <span class="badge badge-secondary">+{mail.repliesCount}</span>
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
