import React from "react";
import styled from "@emotion/styled";

const ImgBlock = styled.div`
  display: flex;
  justify-content: center;
`;

export default () => (
  <React.Fragment>
    {/* <h1>The Problem</h1> */}
    <ImgBlock>
      <img src="img/preferences-avg.png" />
      <img src="img/preferences-elite.png" />
    </ImgBlock>
  </React.Fragment>
);
