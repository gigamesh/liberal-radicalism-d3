import styled from "styled-components";

export default styled.button`
  display: inline-block;
  position: relative;
  border: 1px solid #555;
  z-index: 5;
  font-size: 1.3rem;
  background: #fff;
  font-family: inherit;
  border-radius: 3px;
  padding: 0.5rem;
  margin-left: 10px;
  white-space: pre;
  cursor: pointer;
  &:hover {
    color: var(--green);
    border: 1px solid var(--green);
  }
  &:active {
    color: #fff;
    background: var(--green);
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;
