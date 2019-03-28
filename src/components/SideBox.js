import React from "react";
import styled from "@emotion/styled";
import Button from "./Button";
import sideText from "./sideText";
import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();

const Container = styled.div`
  top: 0;
  right: 0;
  width: 40vw;
  padding: 3.2rem 5vw 2rem;
  text-align: justify;
  opacity: ${({ opacity }) => opacity};
  transition: opacity 500ms ease 1500ms;
  p:first-of-type {
    margin-top: 0;
  }
  h3 {
    text-align: center;
  }
  figure {
    text-align: center;
    max-width: 350px;
    margin: 0 auto 1rem;
  }
  figcaption {
    font-size: 0.8rem;
    font-style: italic;
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
  flex-wrap: wrap;
  justify-content: flex-end;
  padding-bottom: 40px;
`;

const MainTitle = styled.div`
  width: 30vw;
  z-index: 5;
  position: fixed;
  top: 0;
  opacity: ${({ opacity }) => opacity};
  transition: 500ms ease-in-out;
  h1 {
    margin: 0.7rem 0 0.7rem;
    font-size: ${window.innerHeight < 350 ? "1.5rem" : "2rem"};
    text-align: right;
    color: #777;
  }
  background: #fff;
`;

class SideBox extends React.Component {
  scrollRef = React.createRef();

  componentDidUpdate(prevProps) {
    if (prevProps.currentView !== this.props.currentView) {
      this.scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  render() {
    const {
      navigationHandler,
      sideBoxShowing,
      currentView,
      donationToggler,
      donationsGrouped,
      publicFundHandler,
      fundsActive
    } = this.props;
    const continueOn =
      (currentView !== 8 && (currentView !== 3 && currentView !== 5)) ||
      fundsActive;
    return (
      <>
        <div ref={this.scrollRef} />
        <Container opacity={sideBoxShowing ? 1 : 0}>
          <MainTitle
            className="header-main"
            opacity={currentView < 2 || currentView === 8 ? 0 : 1}
          >
            <h1>liberal radicalism</h1>
          </MainTitle>
          <TextWrap>{sideText[currentView]}</TextWrap>
          <BtnWrapper>
            <div>
              {currentView > 2 && currentView < 7 && (
                <Button
                  id="donation_all"
                  onClick={donationToggler}
                  className={donationsGrouped && "active"}
                >
                  Toggle Donations
                </Button>
              )}
            </div>
            <div>
              {currentView > 2 && currentView !== 8 && (
                <Button id="back" onClick={navigationHandler}>
                  Back
                </Button>
              )}
              {!continueOn && currentView !== 8 && (
                <Button onClick={publicFundHandler}>Fund It!</Button>
              )}
              {continueOn && (
                <Button id="fwd" onClick={navigationHandler}>
                  Continue
                </Button>
              )}
            </div>
          </BtnWrapper>
        </Container>
      </>
    );
  }
}

export default SideBox;
