import React from "react";

export default {
  2: (
    <React.Fragment>
      <p>
        Imagine an election between Alice, Bill and Carl in a jurisdiction with
        a typical public financing scheme: all donations collected during a
        predetermined campaign period are matched dollar-for-dollar up to a
        specified threshold.
      </p>
      <p>
        In our election, there is $50 million in public funds up for grabs.
        We'll assume donations are matched up to $2,700 (This is the current
        limit per donor in U.S. national elections, however donations are only
        matched up to $250. For the purposes of this demonstration, a higher cap
        is more useful).
      </p>
    </React.Fragment>
  ),
  3: (
    <React.Fragment>
      <p>
        There are multiple problems with dollar-for-dollar matching schemes like
        this:
      </p>
      <ul>
        <li>
          Wealthy donors are able to exert far more influence, especially if the
          limit is set at a high amount (ex: Bill received most of his funds
          from donors giving between $2-2.7k).
        </li>
        <li>
          A lower matching limit incentivizes wealthy donors to exert influence
          through opague & corrupt channels (lobbying,
          <a
            href="https://www.opensecrets.org/pacs/superpacs.php"
            target="_blank"
          >
            "Super PACs"
          </a>
          , Mar-a-Lago memberships, etc).
        </li>
        <li>
          Donation limits are fairly arbitrary and at the mercy of the officials
          currently in power.
        </li>
        <li>
          The system can cease being useful over time if not supported and
          administered well (ex: Most major U.S. presidential candidates haven't
          accepted public funding since 2008 because associated limits on
          spending haven't been increased with election costs).
        </li>
      </ul>
    </React.Fragment>
  ),
  4: (
    <React.Fragment>
      <p>Back to our election...</p>
      <p>
        Each green dot in the chart represents 1,000 donations in dollar ranges
        specified by the legend on the left and each candidate's total is listed
        at the bottom.
      </p>
      <p>
        Click "Fund It!" below to see how much each candidate would get from the
        $50 million pot.
      </p>
    </React.Fragment>
  ),
  5: (
    <React.Fragment>
      <p>
        As the totals show, each candidate's ratio stayed constant. The public
        funds give each candidate more to work with, but they don't change the
        competitive balance.
      </p>
      <p>
        Before and after the public funds, Bill would have the same financial
        advantage, and Alice's supporters would likely not appreciate this
        considering his supporters tend to be more financially comfortable.
      </p>
    </React.Fragment>
  ),

  6: (
    <React.Fragment>
      <h3>The Liberal Radicalism formula:</h3>
      <figure>
        <img src="/img/formula.png" alt="Liberal Radicalism Formula" />
        <figcaption>
          (square of the sum of the square roots of all donations)
        </figcaption>
      </figure>
      <p>
        The squaring is why its often referred to as Quadratic Finance. Rather
        than disecting the math, let's witness its magic when applied to the
        public fund.
      </p>
    </React.Fragment>
  ),
  7: (
    <p>
      As the donation groups show, the Liberal Radical mechanism tips the
      competitive balance in favor of candidates who receive more individual
      donations. In this scenario, Alice would end up with more total funds than
      Bill.
    </p>
  )
};
