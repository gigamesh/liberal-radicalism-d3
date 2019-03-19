import React from "react";
import styled from "@emotion/styled";
import Button from "./Button";
import sideText from "./sideText";

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 35vw;
  padding: 3.2rem 3vw 2rem;
  text-align: justify;
  opacity: ${({ opacity }) => opacity};
  transition: opacity 500ms ease 1500ms;
  p:first-of-type {
    margin-top: 0;
  }
  z-index: -1;
  h3 {
    text-align: center;
  }
  figure {
    text-align: center;
    margin-bottom: 1rem;
  }
  button:first-of-type {
    margin-left: 0;
  }
  img {
    width: 100%;
    height: auto;
  }
`;

const TextWrap = styled.div`
  margin-bottom: 2rem;
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
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
    font-size: ${window.innerHeight < 350 ? "1.5rem" : "2rem"};
    text-align: right;
    color: #777;
  }
  background: #fff;
`;

export default function SideBox({
  continueHandler,
  sideBoxShowing,
  currentView,
  donationToggler,
  donationsGrouped,
  backHandler,
  publicFundHandler,
  fundsActive
}) {
  const fundItOn =
    (!fundsActive && currentView === 3) || (!fundsActive && currentView === 5);
  const continueOn = (currentView !== 3 && currentView !== 5) || fundsActive;
  return (
    <Container opacity={sideBoxShowing ? 1 : 0}>
      <MainTitle className="header-main" opacity={currentView < 2 ? 0 : 1}>
        <h1>liberal radicalism</h1>
      </MainTitle>
      <TextWrap>{sideText[currentView]}</TextWrap>
      <BtnWrapper>
        <div>
          {currentView > 2 && (
            <Button
              small={window.innerHeight < 600}
              id="donation_all"
              onClick={donationToggler}
              className={donationsGrouped && "active"}
            >
              Toggle Donations
            </Button>
          )}
        </div>
        <div>
          {/* {currentView > 2 && <Button onClick={backHandler}>Back</Button>} */}
          {fundItOn && <Button onClick={publicFundHandler}>Fund It!</Button>}
          {continueOn && <Button onClick={continueHandler}>Continue</Button>}
        </div>
      </BtnWrapper>
    </Container>
  );
}
