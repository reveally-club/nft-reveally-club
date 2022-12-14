import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { track } from "@amplitude/analytics-browser";
import { setSearchText } from "../state/search";

const Search = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const inputRef = useRef<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputRef.current = e.target.value;
    setText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchText({ text: text }));

    const eventProperties = {
      SearchTerm: text,
    };

    track("Search Project", eventProperties);
  };

  return (
    <form className="mb-4" onSubmit={onSubmit}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 rounded-lg bg-white focus:ring-black focus:border-black"
          placeholder="Doodles, Azuki, Cool Cats, ..."
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
};

export default Search;
