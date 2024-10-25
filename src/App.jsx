import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./App.css";
import Bars from "react-loading-icons/dist/esm/components/bars";
function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const url = "https://jsonplaceholder.typicode.com/todos"
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Cannot fetch the data:  ${response.status}`);
      }
      const responseData = await response.json();
      setResult(responseData);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchClick = () => {
    if (input.trim() !== "") {
      fetchData;
      setIsLoading(false)
    }
    console.log(result)
  };
  return (
    <>
      <div className="input-box cursor-pointer border-[1px] p-2 flex">
        <input
          className="border-0 outline-none cursor-pointer hidden "
          type="text"
          placeholder="Enter name to search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="cursor-pointer" onClick={handleSearchClick}>
          <FaSearch />
        </div>
      </div>
      <div className="searchResult">
        {!isLoading && result.length > 0 && result.map((item, index) => {
          return (
            <div key={index}>
              <li>{item.title}</li>
            </div>
          );
        })}
        {isLoading && (
          <div>
            <Bars stroke="#f00000" fill="#f00000" width={70} height={70} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;