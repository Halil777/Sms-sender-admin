import { FC, useState } from "react";

interface SearchUserMessageProps {
  suggestions: string[];
  onChange: (name: string) => void;
}

const SearchUserMessage: FC<SearchUserMessageProps> = ({
  suggestions,
  onChange: onInputChange,
}) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    const newFilteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
    setValue(inputValue);
    setFilteredSuggestions(newFilteredSuggestions);

    // Call the onChange prop
    onInputChange(inputValue);
  };

  const onSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    setFilteredSuggestions([]);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <div className="flex   flex-col gap-3">
        <label htmlFor="region" className="mr-2 dark:text-white font-medium">
          Search by Name:
        </label>
        <input
          type="text"
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`block w-52 mb-5 p-2 h-11 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-width duration-500 ${
            isFocused ? "w-[300px]" : "w-1/2"
          }`}
          placeholder="Type a client name"
        />
      </div>
      {filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg">
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => onSuggestionClick(suggestion)}
              className="px-4 py-2 text-gray-900 cursor-pointer hover:bg-gray-100"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchUserMessage;
