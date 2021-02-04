import { useRef } from "react";
import Select from "react-select";

import { StyledButton } from "./CategoryDropDownStyle";

export const CategoryDropDown = () => {
  const inputRef = useRef();

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     setKeyword(inputRef?.current?.value);
  //     inputRef.current.value = "";
  //   }
  //};

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div>
      {/* <StyledButton />

      <Select
        defaultValue={[options[1], options[2]]}
        isMulti
        name="colors"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
      /> */}
    </div>
    // <StyledSearchBox>
    //   <StyledSearchInput ref={inputRef} onKeyDown={handleKeyDown} />
    //   <StyledSearchButton
    //     onClick={() => {
    //       setKeyword(inputRef?.current?.value);
    //       inputRef.current.value = "";
    //     }}
    //   >
    //     <SearchIcon />
    //   </StyledSearchButton>
    // </StyledSearchBox>
  );
};
