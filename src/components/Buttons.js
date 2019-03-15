import React from "react";
import styled from "@emotion/styled";

const Toolbar = styled.div`
  height: ${({ height }) => height};
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export default function Buttons(props) {
  return props.currentView > -1 ? (
    <Toolbar id="donations-buttons" height={props.footerHeight}>
      <button
        id="donation_all"
        onClick={props.donationButtonHandler}
        className="button active"
      >
        All Donations
      </button>
      <button
        id="donation_tiers"
        onClick={props.donationButtonHandler}
        className="button"
      >
        Donations By Tier
      </button>
    </Toolbar>
  ) : null;
}
