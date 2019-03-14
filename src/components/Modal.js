import React from "react";
import styled from "@emotion/styled";
import Transition from "react-transition-group/Transition";
import Fade from "react-reveal/Fade";
import Button from "./Button";
import View0 from "./View0";
import View1 from "./View1";
import View2 from "./View2";

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
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
`;

const InnerWrap = styled.div`
  height: 100%;
`;

const WithBtnWrap = styled.div`
  height: 95vh;
  max-height: 500px;
  max-width: 650px;
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ContentWrap = styled.div`
  display: ${({ display }) => (display ? "block" : "none")};
  width: 100%;
  h1 {
    font-size: 3em;
    text-align: center;
    margin-bottom: 60px;
  }
  h2 {
    margin-bottom: 30px;
  }
  p {
    text-align: justify;
    font-size: 20px;
  }
  p:last-of-type {
    margin-bottom: 40px;
  }
  div {
    justify-content: flex-end;
    display: flex;
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
    return (
      <Transition in={inProp} timeout={duration}>
        {state => (
          <FullWrap
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
                  <ContentWrap display={currentView === 0}>
                    <View0 />
                  </ContentWrap>
                </Fade>
                <Fade
                  delay={300}
                  left
                  opposite
                  when={currentView === 1}
                  collapse
                >
                  <ContentWrap display={currentView === 1}>
                    <View1 />
                  </ContentWrap>
                </Fade>
                <Fade
                  delay={300}
                  left
                  opposite
                  when={currentView === 2}
                  collapse
                >
                  <ContentWrap display={currentView === 2}>
                    <View2 />
                  </ContentWrap>
                </Fade>
              </InnerWrap>
              <Btn onClick={continueHandler}>Continue</Btn>
            </WithBtnWrap>
          </FullWrap>
        )}
      </Transition>
    );
  }
}

export default Modal;
