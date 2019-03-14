import React from "react";
import styled from "@emotion/styled";

const Quote = styled.blockquote`
  font-size: 30px;
  font-style: italic;
  line-height: 50px;
  &:before {
    content: "\201C";

    /*Font*/
    font-family: Georgia, serif;
    font-size: 60px;
    font-weight: bold;
    color: #999;

    /*Positioning*/
    position: absolute;
    left: 10px;
    top: 5px;
  }

  &:after {
    content: "";
  }
`;

export default () => (
  <React.Fragment>
    <Quote>
      The preferences of the average american appear to have only a miniscule,
      near-zero, statistically non-significant impact upon public policy.
    </Quote>
  </React.Fragment>
);
