import React from "react";

export default {
  2: (
    <React.Fragment>
      <p>
        Imagine Alice and Bill are campaigning for political office in a
        jurisdiction that uses a typical public campaign finance scheme: every
        donation from supporters collected during a specified length of time is
        matched dollar-for-dollar from a public fund, up to a limit per
        donation.
      </p>
    </React.Fragment>
  ),
  3: (
    <React.Fragment>
      <p>
        In our race, there is a $50 million public fund up for grabs. Candidates
        are limited to accepting a maximum of $2,700 per donor and the first
        $250 of each donation is matched by the public fund (these are the
        current limits in U.S. national campaigns).
      </p>
      <p>
        Each green dot in the chart represents approximately 400 donations in
        dollar ranges specified by the legend on the left, and each candidate's
        total is listed at the bottom.
      </p>
      <p>
        Alice is the most popular candidate, receiving the largest number of
        donations, while Bill collects more in total funds because he is more
        popular among financially endowed supporters.
      </p>
      <p>
        Click "Fund It!" below to see how much each candidate would get from the
        $50 million pot.
      </p>
    </React.Fragment>
  ),
  4: (
    <React.Fragment>
      <p>
        As the totals show, Alice received a modest competitive boost, but Bill
        is still far ahead.
      </p>

      <p>
        There are multiple problems with dollar-for-dollar matching schemes like
        this:
      </p>
      <ul>
        <li>
          Wealthy donors are able to exert more influence if the donation limit
          is set too high (ex: Bill received most of his funds from donors
          giving between $2-2.7k).
        </li>
        <li>
          If the limits are set too low, wealthy donors are incentivized to
          exert influence through opague & corrupt channels (lobbying,{" "}
          <a
            href="https://www.opensecrets.org/pacs/superpacs.php"
            target="_blank"
          >
            "Super PACs"
          </a>
          , Mar-a-Lago memberships, etc).
        </li>
        <li>
          Arbitrary thresholds don't flex to changing circumstances, and are
          ultimately at the mercy of the officials currently in power.
        </li>
        <li>
          Because of everything listed above, a system like this can cease being
          useful over time if not administered well (ex: Most major U.S.
          presidential candidates haven't accepted public funding since 2008
          because associated limits on spending haven't been increased with
          campaign costs).
        </li>
      </ul>
    </React.Fragment>
  ),

  5: (
    <React.Fragment>
      <p>
        Now let's re-run the campaign using the Liberal Radicalism mechanism.
        Rather than matching each donation up to the arbitrary $250 threshold,
        the L.R. formula will be used to determine how the public fund will be
        apportioned:
      </p>
      <figure>
        <img src="/img/formula.png" alt="Liberal Radicalism Formula" />
        <figcaption>
          (square of the sum of the square roots of all donations)
        </figcaption>
      </figure>
      <p>
        It's more simple than it might seem. Rather than dissecting the math,
        let's witness its magic...
      </p>
    </React.Fragment>
  ),
  6: (
    <p>
      As the donation groups show, the Liberal Radical mechanism tips the
      competitive balance in favor of candidates who receive more individual
      donations. In this scenario, Alice would end up with more total funds than
      Bill.
    </p>
  )
};
