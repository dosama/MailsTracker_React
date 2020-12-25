import mails from '../data/mails.json'

let mailService = {};


mailService.getMails = () => {
    return mails;
  };

 export default mailService;