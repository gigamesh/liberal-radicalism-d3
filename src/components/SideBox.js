import React from "react";
import styled from "@emotion/styled";
import Button from "./Button";
import Buttons from "./Buttons";
import sideText from "./sideText";

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  top: 0;
  right: 0;
  width: 35vw;
  padding: 3.2rem 3vw 2rem;
  text-align: justify;
  opacity: ${({ opacity }) => opacity};
  transition: opacity 500ms ease 1500ms;
  p {
    font-size: 1.2rem;
  }
  p:first-of-type {
    margin-top: 0;
  }
  z-index: -1;
`;

const MainTitle = styled.div`
  width: 30vw;
  z-index: 5;
  position: fixed;
  top: 0;
  opacity: ${({ opacity }) => opacity};
  transition: 500ms ease-in-out;
  h1 {
    margin: 0.7rem;
    font-size: ${window.innerHeight < 350 ? "1.5rem" : "2.3rem"};
    text-align: right;
    color: #777;
  }
  background: #fff;
`;

export default function SideBox({
  continueHandler,
  sideBoxShowing,
  currentView,
  donationButtonHandler
}) {
  // console.log(sideBoxShowing);
  return (
    <Container opacity={sideBoxShowing ? 1 : 0}>
      <MainTitle className="header-main" opacity={currentView < 2 ? 0 : 1}>
        <h1>liberal radicalism</h1>
      </MainTitle>

      <div dangerouslySetInnerHTML={{ __html: sideText[currentView] }} />
      <Buttons
        donationButtonHandler={donationButtonHandler}
        continueHandler={continueHandler}
        currentView={currentView}
      />
      <Button onClick={continueHandler}>Continue</Button>
    </Container>
  );
}
