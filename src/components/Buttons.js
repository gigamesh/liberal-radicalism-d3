import React from "react";
import styled from "@emotion/styled";
import Button from "./Button";

const Wrapper = styled.div`
  height: ${({ height }) => height};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export default function Buttons(props) {
  return props.currentView > -1 ? (
    <Wrapper id="donations-buttons" height={props.footerHeight}>
      <Button
        small={window.innerHeight < 600}
        id="donation_all"
        onClick={props.donationButtonHandler}
        className="button active"
      >
        All Donations
      </Button>
      <Button
        small={window.innerHeight < 600}
        id="donation_tiers"
        onClick={props.donationButtonHandler}
        className="button"
      >
        Donations By Tier
      </Button>
    </Wrapper>
  ) : null;
}
