import { useContext, useRef, useState } from "react";
import {
  StyledSearchBox,
  StyledSearchInput,
  StyledSearchButton,
} from "./SearchBoxStyle";
// import { MovieContext } from "../../Movie";

import SearchIcon from "@material-ui/icons/Search";

export const SearchBox = () => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();

  //   const { setSearchKeyword } = useContext(MovieContext);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      alert(inputRef?.current?.value);
      //   setSearchKeyword(inputRef?.current?.value);
    }
  };

  return (
    <StyledSearchBox>
      <StyledSearchInput
        ref={inputRef}
        color="black"
        isColored
        onChange={(evt) => setInputValue(evt.target.value)}
        onKeyDown={handleKeyDown}
      />
      <StyledSearchButton
        onClick={
          () => alert("clicked")
          // setSearchKeyword(inputRef?.current?.value)
        }
      >
        <SearchIcon />
      </StyledSearchButton>
    </StyledSearchBox>
  );
};
