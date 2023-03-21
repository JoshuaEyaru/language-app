import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [randomWord, setRandomWord] = useState('history');
  const [currentWord, setCurrentWord] = useState('');
  const [wordMeaning, setWordMeaning] = useState('')
  const [prevWord, setPrevWord] = useState([])

  const getWord = () => {
    makeQuery();
  }
  
  const makeQuery = () => {
    let query = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${randomWord}`;
    setCurrentWord(randomWord)
    callAPI(query).catch(console.error);
  }

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();

    if(json[0].word === randomWord){
      setWordMeaning(json[0].meanings)
    }
    
  }

  
  return (
    <div className="App">
      
      <div className='word-seen'>
        <h3>Words seen</h3>

        <br></br>
        <div className='seen-display'></div>
      </div>

      <div className='word-new'>
        <h2>Improve Your English Vocabulary</h2>
        <h3>Discover English words and practice!</h3>
        
        <br></br>
        <div className='display-word'>
          <h3>{currentWord}</h3>
          {wordMeaning.length > 0 && (
            <ul>
              {wordMeaning.map(meaning => (
                <li key={meaning.partOfSpeech}>
                  <h4>{meaning.partOfSpeech}</h4>
                  <p>{meaning.definitions[0].definition}</p>
                </li>
              ))}
            </ul>
          )}

        </div>

        <br></br>
        <button onClick={getWord}>New Word</button>
      </div>

      <div className='word-banned'>
        <h3>Banned Words</h3>

        <br></br>
        <div className='banned-display'></div>
      </div>

    </div>
  )
}

export default App
