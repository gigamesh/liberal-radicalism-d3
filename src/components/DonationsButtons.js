import React from "react";
import styled from "@emotion/styled";

const Toolbar = styled.div`
  height: ${({ height }) => height};
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export default function DonationsButtons(props) {
  return (
    <Toolbar id="donations-buttons" height={props.footerHeight}>
      <a
        href="#"
        id="donation_all"
        onClick={props.donationButtonHandler}
        className="button active"
      >
        All Donations
      </a>
      <a
        href="#"
        id="donation_tiers"
        onClick={props.donationButtonHandler}
        className="button"
      >
        Donations By Tier
      </a>
    </Toolbar>
  );
}
