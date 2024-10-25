import { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import "./App.css";
import Bars from "react-loading-icons/dist/esm/components/bars";
function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const audio = useRef(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
        input
      )}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Word not Found! ${response.status}`);
      }
      const responseData = await response.json();
      setResult(responseData);
      setError(null);
      console.log(responseData);
    } catch (err) {
      setError(err.message);
      setResult(null);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleSearchClick = () => {
    if (input.trim() !== "") {
      fetchData();
    } else {
      setError("Please enter a word");
    }
    console.log(result);
  };

  const handlePlay = () => {
    if (audio.current) {
      audio.current.play();
    }
  };
  useEffect(()=>{
    setTimeout(() => {
      
    }, 86400);
  },[])
  return (
    <>
    <div className="bg-blue-600 h-12 w-full flex justify-center items-center text-white font-bold text-xl">Simple Dictionary</div>
      <div className="input-box border-[1px] p-2 flex">
        <input
          className="border-0 outline-none"
          type="text"
          placeholder="Enter word to search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="cursor-pointer" onClick={handleSearchClick}>
          <FaSearch />
        </div>
      </div>
      <div className="searchResult ">
        {result &&
          result.map((word, index) => {
            return (
              <div key={index} className="">
                <ol>
                  <div className="flex justify-between items-center pb-4 ">
                    <h1 className="capitalize text-2xl font-bold">
                      {word.word}
                    </h1>
                    <div className="flex items-center gap-2">
                      <p>{word.phonetic}</p>
                      <div>
                        <div onClick={handlePlay}>
                          <FaVolumeUp />
                        </div>

                        <audio
                          src={
                            word.phonetics[1]?.audio || word.phonetics[0]?.audio
                          }
                          ref={audio}
                        ></audio>
                      </div>
                    </div>
                  </div>
                  <div>{word.orign && <p>ORIGIN: {word.origin}</p>}</div>
                  {word.meanings.map((meaning, i) => (
                    <div key={i}>
                      <strong>{meaning.partOfSpeech}</strong>
                      <p>
                        Meaning <br />
                      </p>
                      {meaning.definitions.map((definition) => (
                        <div  className="bg-yellow-700 mt-4 rounded-lg text-white px-3 py-2">
                          <p className="flex flex-col  mt-1 md:min-w-96 min-w-72 font-bold capitalize">
                            {definition.definition}
                          </p>
                          {definition.example && (
                            <p>Example in sentence(s): {definition.example}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </ol>
              </div>
            );
          })}
        {isLoading && (
          <div>
            <Bars stroke="#f00000" fill="#f00000" width={70} height={70} />
          </div>
        )}
      </div>
      <div className="flex justify-center items-center font-bold text-xl">
        {error && <p className="text-red-500">{error}</p>}
      </div>
      {/* <div className="flex justify-center items-center font-bold">
        {result.map((word) => {
          <div>
            <h2 className="text-2xl text-blue-900">Word of the Day</h2>

            <h1>{Math.random(word.word)}</h1>
            <p>{word.meanings.definitions[0]}</p>
          </div>;
        })}
      </div> */}
    </>
  );
}

export default App;
