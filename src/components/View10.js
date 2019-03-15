import React from "react";
import styled from "@emotion/styled";

const Wrap = styled.div`
  max-width: 600px;
`;

const Quote = styled.blockquote`
  position: relative;
  font-size: 30px;
  font-style: italic;
  line-height: 50px;
  text-align: justify;
  margin-right: 0;
`;

const Cite = styled.cite`
  display: inline-block;
  width: 100%;
  font-size: 18px;
  text-align: right;
  font-style: normal;
`;

export default () => (
  <Wrap>
    <Quote>
      Act only in accordance with that maxim through which you can at the same
      time will that it become a universal law
    </Quote>
    <Cite>Immanuel Kant</Cite>
  </Wrap>
);
