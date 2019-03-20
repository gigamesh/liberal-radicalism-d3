import React from "react";
import styled from "@emotion/styled";
import Transition from "react-transition-group/Transition";
import Fade from "react-reveal/Fade";
import Button from "./Button";
import View0 from "./View0";
import View1 from "./View1";
import ViewFinal from "./ViewFinal";

const Views = { 0: View0, 1: View1, 7: ViewFinal };

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 }
};

const duration = 1000;

const FullWrap = styled.div`
  opacity: 0;
  transition: opacity ${duration}ms ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /* width: 100vw;
  height: 100vh; */
  z-index: 1;
  background: ${({ final }) =>
    final ? "rgba(255, 255, 255, 1)" : "rgba(255,255,255, .9)"};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
`;

const InnerWrap = styled.div`
  height: 100%;
`;

const WithBtnWrap = styled.div`
  height: 100vh;
  max-height: 22rem;
  max-width: 40rem;
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const ContentWrap = styled.div`
  display: ${({ display }) => display};
  width: 100%;
  h1 {
    text-align: center;
    margin-bottom: 2rem;
    margin-top: 0;
  }
  h2 {
    margin-bottom: 30px;
  }
  p {
    text-align: justify;
    font-size: 1.2rem;
  }
  p:last-of-type {
    margin-bottom: 2rem;
  }
  .final p,
  h1 {
    margin: 2rem 0 2rem;
    text-align: center;
  }
  .credits {
    font-style: italic;
    margin-top: 5rem;
  }
`;

let Btn = styled(Button)`
  align-self: flex-end;
`;

class Modal extends React.Component {
  state = {
    show: false
  };

  render() {
    const { in: inProp, currentView, continueHandler } = this.props;
    const nextView = (currentView, num) => {
      const CurrentView = Views[num];
      return (
        <Fade delay={300} left opposite when={currentView === num} collapse>
          <ContentWrap display={currentView === num ? "block" : "none"}>
            <CurrentView />
          </ContentWrap>
        </Fade>
      );
    };

    return (
      <Transition in={inProp} timeout={duration} unmountOnExit>
        {state => (
          <FullWrap
            final={currentView === 7}
            style={{
              ...transitionStyles[state]
            }}
          >
            <WithBtnWrap>
              <InnerWrap>
                <Fade
                  duration={500}
                  left
                  opposite
                  when={currentView === 0}
                  collapse
                >
                  <ContentWrap display={currentView === 0 ? "block" : "none"}>
                    <View0 />
                  </ContentWrap>
                </Fade>
                {nextView(currentView, 1)}
                {nextView(currentView, 7)}
              </InnerWrap>
              {currentView !== 7 && (
                <Btn
                  onClick={continueHandler}
                  style={{ position: "absolute", bottom: 0, right: 0 }}
                >
                  Continue
                </Btn>
              )}
            </WithBtnWrap>
          </FullWrap>
        )}
      </Transition>
    );
  }
}

export default Modal;
