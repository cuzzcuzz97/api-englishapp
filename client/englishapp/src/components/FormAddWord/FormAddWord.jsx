import { nothing } from 'immer';
import React, {useState, useRef, useEffect} from 'react';
import { addNewVocab } from '../../api/auth';
import axios from 'axios';
import { eventNames } from 'process';

const FormAddWord = ({words,list_id,setWords,getVocab,getListVocab}) => {
    const inputRef = useRef(null);
    const [newWord, setNewWord] = useState("");
    const [newMeaning, setNewMeaning] = useState("");
    const [recommendedVocab, setRecommendedVocab] = useState("");
    const [recommendInput, setRecommendInput] = useState([])
    const [suggestions, setSuggestions] = useState([])

    // function debounce(func, delay) {
    //     let timerId;
    //     return function(...args) {
    //       if (timerId) {
    //         clearTimeout(timerId);
    //       }
    //       timerId = setTimeout(() => {
    //         func.apply(this, args);
    //         timerId = null;
    //       }, delay);
    //     };
    //   }

    useEffect(() => {
      const loadInput = async() => {
        const response = await axios.get('http://localhost:5000/words')
        setRecommendInput(response.data)
      }
      loadInput();
    },[])

    // const debouncedSearch = debounce((text) => {
    //     let matches = [];
    //     if (text.length > 0) {
    //       matches = recommendInput.filter((item) => {
    //         const regex = new RegExp(`^${text}`, "gi");
    //         return item.name.match(regex);
    //       });
    //     }
    //     setSuggestions(matches);
    //   }, 500);
      
    //   const onChangeHandleInput = (event) => {
    //     const text = event
    //     debouncedSearch(text);
    //   };

    function doGet(txt) {
        var sourceText = txt;  
        var sourceLang = 'en';
        var targetLang = 'vi';
          
        var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
                  + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
        
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            let data = JSON.parse(request.responseText);
            let finaltext = '';
            try { 
                for (let i = 0; i < data[0].length; i++) {
                    finaltext += data[0][i][0];
                  } 
                setRecommendedVocab(finaltext);
            } catch {
            }

            setNewMeaning(recommendedVocab)
          }
        };
        request.send();
      }
      
    const handleAddWord = async (event) => {
        event.preventDefault();
        if (newWord.trim() === '' || newMeaning.trim() === '') {
            return;
        }
        if (list_id) {
            const word = {name: newWord, meaning: newMeaning, list_id: list_id};
            await addNewVocab(word)
            await getListVocab(list_id)
            await getVocab(list_id)
        } else {
            const word = {name: newWord, meaning: newMeaning};
            setWords([...words,word])
        }
        setNewWord("");
        setNewMeaning("");
        inputRef.current.focus();
    }
  return (
    <form className="form_addword" onSubmit={handleAddWord}>
    <div className='new_vocab-form'>
        <label htmlFor="vocab">New Word:
            <input name='vocab' type="text" 
            value={newWord} 
            autoComplete='off'
            onChange={(event) => {
                setNewWord(event.target.value)
                setRecommendedVocab(event.target.value)
                doGet(event.target.value)
                // onChangeHandleInput(event.target.value)
            }}
            ref={inputRef}
            />
            {/* {suggestions && suggestions.slice(0, 4).map((suggestion,i)=> 
            <div className='vocab__suggestion' key={i}>{suggestion.name}</div>
            )} */}
        </label>
        <br />
        <label htmlFor="meaning">New Meaning:
            <input name='meaning' type="text" 
            value={newMeaning} 
            autoComplete='off'
            onChange={(event) =>
             {setNewMeaning(event.target.value);
                setRecommendedVocab(event.target.value)}} 
             />
        </label>
    </div>
    <div className='form_addword-btn'>
        <button type="submit">Add Word</button>
    </div>
</form>
  )
}

export default FormAddWord