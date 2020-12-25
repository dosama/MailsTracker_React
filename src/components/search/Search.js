import React ,{useState, useEffect}from 'react';
import mailService from '../../api/mails-service';
import Autosuggest from 'react-autosuggest';
import './Search.css';
import mailSearchEvent from '../events/mail-search-event';

function Search() {
    const [suggestions, setSuggestions] = useState([]);
    const [mails, setMails] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        if(!mails || mails.length == 0)
        {
            let mails = mailService.getMails();
            setMails(mails);
            
        }
    
    }, [mails]);

    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : mails.filter(mail =>
            mail.name.toLowerCase().slice(0, inputLength) === inputValue
        );
      };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);
const onChange = (event, { newValue }) => {
    setValue(newValue);
    console.log(newValue);
    const selectedMail = mails.find((i)=> i.name == newValue);
    console.log(selectedMail);

    mailSearchEvent.mailSearchCompletedEvent(selectedMail?selectedMail.id:'');

  
  };

const inputProps = {
    placeholder: 'Search',
    value,
    onChange: onChange
  };
 
  return (
  <div  className="Search w-100">
     
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
 

 </div>

 );
}

export default Search;
