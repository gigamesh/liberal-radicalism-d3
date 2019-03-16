import React from "react";
import styled from "@emotion/styled";

const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function LandscapeMessage() {
  return (
    <Wrap>
      <p>Please rotate your device 🔄</p>
    </Wrap>
  );
}
