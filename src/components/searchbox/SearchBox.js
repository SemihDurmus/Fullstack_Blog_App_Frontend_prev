import { useRef, useContext } from "react";
import { Context } from "../../context/Context";
import {
  StyledSearchBox,
  StyledSearchInput,
  StyledSearchButton,
} from "./SearchBoxStyle";

import SearchIcon from "@material-ui/icons/Search";

export const SearchBox = () => {
  const inputRef = useRef();
  const { setKeyword } = useContext(Context);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setKeyword(inputRef?.current?.value);
      inputRef.current.value = "";
    }
  };

  return (
    <StyledSearchBox>
      <StyledSearchInput ref={inputRef} onKeyDown={handleKeyDown} />
      <StyledSearchButton
        onClick={() => {
          setKeyword(inputRef?.current?.value);
          inputRef.current.value = "";
        }}
      >
        <SearchIcon />
      </StyledSearchButton>
    </StyledSearchBox>
  );
};
