import styled from "styled-components";

export default styled.button`
  display: block;
  position: relative;
  border: 1px solid #555;
  z-index: 5;
  font-size: ${({ small }) => (small ? "1rem" : "1.3rem")};
  height: ${({ small }) => (small ? "2rem" : "3rem")};
  background: #fff;
  font-family: inherit;
  border-radius: 3px;
  cursor: pointer;
`;
