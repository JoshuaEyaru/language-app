import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [randomWord, setRandomWord] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [wordMeaning, setWordMeaning] = useState('')
  const [prevWord, setPrevWord] = useState([])
  const [bannedWords, setBannedWords] = useState([])

  const wordList = ["antefixal","antefixes","anteing","antelope","ballistites","ballistospore","ballistospores","ballium","discomposedly","discomposes","discomposing","prologue","prologued","prologues","prologuing","prologuise"];

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const randomWord = wordList[randomIndex];
    setRandomWord(randomWord);
    setCurrentWord('');
    setWordMeaning('');
  }

  useEffect(() => {
    getRandomWord();
  }, []);

  const getWord = () => {
    getRandomWord();
    makeQuery();
  }
  
  const makeQuery = () => {
    let query = `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`;
    setCurrentWord(randomWord)
    callAPI(query).catch(console.error);
  }

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
  
    if(json.length === 0){
      setWordMeaning([{partOfSpeech: '', definitions: [{definition: 'sorry api has no meaning for such word'}]}]);
    } else if(json[0].word === randomWord){
      setWordMeaning(json[0].meanings);
    }
  }
  
  

  const addToBannedWords = () => {
    setBannedWords([...bannedWords, currentWord]);
  }

  const addToSeenWords = () => {
    setPrevWord([...prevWord, currentWord]);
  }

  return (
    <div className="App">
      <div className='word-seen'>
        <h3>Words seen</h3>
        <br />
        <div className="seen-display">
          {prevWord.map((word, index) => (
            <div key={index}>{word}</div>
          ))}
        </div>
      </div>

      <div className='word-new'>
        <h2>Improve Your English Vocabulary</h2>
        <h3>Discover English words and practice!</h3>
        <br />
        <div>
          <h3 className="display-word" onClick={addToBannedWords}>{currentWord}</h3>
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
        <br />
        <button onClick={() => {getWord(); addToSeenWords();}}>New Word</button>
      </div>

      <div className='word-banned'>
        <h3>Banned Words</h3>
        <br />
        <div className="banned-display">
          {bannedWords.map((word, index) => (
            <div key={index}>{word}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
