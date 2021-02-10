import styled from "styled-components";

// --------------BUTTON----------------
export const StyledButton = styled.button`
  cursor: pointer;
`;

export const StyledSearchButton = styled(StyledButton)`
  box-sizing: border-box;
  padding: 10px;
  width: 42.5px;
  height: 42.5px;
  position: absolute;
  top: 1px;
  right: 1.5px;
  border-radius: 50%;
  color: #719fb0;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 900;
  transition: all 1s;
  outline: none;
`;

// --------------INPUT----------------
export const StyledSearchInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 47px;
  line-height: 30px;
  outline: 0;
  border: 0;
  visibility: hidden;
  color: #726a95;
  font-size: 1em;
  font-weight: bold;
  border-radius: 20px;
  padding: 0 20px;
`;

// --------------SEARCHBOX----------------
export const StyledSearchBox = styled.div`
  position: relative;
  width: 280px;
  height: 50px;
  background: #fff;
  box-sizing: border-box;
  border-radius: 25px;
  border: 2px solid #351f39;
  padding: 5px;
  outline: 0;
  margin-left: -1%;

  &:hover input {
    visibility: visible;
    background: transparent;
  }

  &:hover button {
    background: #351f39;
  }
`;
