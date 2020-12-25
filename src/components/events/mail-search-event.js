import EventEmitter from 'events';

class MailSearchEvent extends EventEmitter {
 
 mailSearchCompletedEvent =(selectedMail)=> {
   console.log('search result raised', selectedMail);
    this.emit('mailSearchCompleted', selectedMail);
  }

}
const mailSearchEvent = new MailSearchEvent();
export default mailSearchEvent;