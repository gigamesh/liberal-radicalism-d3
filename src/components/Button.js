import styled from "styled-components";

export default styled.button`
  display: inline-block;
  position: relative;
  border: 1px solid #555;
  z-index: 5;
  font-size: ${({ small }) => (small ? "1rem" : "1.3rem")};
  height: ${({ small }) => (small ? "2rem" : "3rem")};
  background: #fff;
  font-family: inherit;
  border-radius: 3px;
  padding: 0 0.5rem 0;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    color: var(--green);
    border: 1px solid var(--green);
  }
  &:active {
    color: #fff;
    background: var(--green);
  }
`;
