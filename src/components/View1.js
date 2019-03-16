import React from "react";
import styled from "@emotion/styled";

const Wrap = styled.div`
  /* max-width: 500px; */
`;

const Quote = styled.blockquote`
  position: relative;
  font-size: 1.8rem;
  font-style: italic;
  line-height: 2.6rem;
  text-align: justify;
  margin-right: 0;
`;

const Cite = styled.cite`
  display: inline-block;
  width: 100%;
  font-size: 1.7rem;
  text-align: right;
  font-style: normal;
`;

export default () => (
  <Wrap>
    <Quote>
      Act only in accordance with that maxim through which you can at the same
      time will that it become a universal law.
    </Quote>
    <Cite>Immanuel Kant</Cite>
  </Wrap>
);
