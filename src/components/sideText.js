import React from "react";

export default {
  2: (
    <React.Fragment>
      <p>
        Imagine Alice and Bill are campaigning for political office in a
        jurisdiction that uses a typical public campaign finance scheme: every
        donation from supporters collected during a specified length of time is
        matched dollar-for-dollar from a public fund, up to a limit per
        donation. For the purposes of demonstration, we'll set the matching
        limit at a generous $1,000, apportioned from a fund of $1.5 million.
      </p>
    </React.Fragment>
  ),
  3: (
    <React.Fragment>
      <p>
        In addition to the matching limit, there would typically also be a limit
        to how much any single suppporter can give (ex: $2,700 in US national
        elections). The intention behind this is to guard against plutocracy.
        However, limits like this can have the opposite intended effect, which
        will be explained more later.
      </p>
      <p>
        In our election, there is no donation limit, and Bill is clearly more
        popular among rich patrons, benefiting from one very generous donation
        of $1 million. Alice received less in total funding, however she has far
        more supporters.
      </p>
      <p>
        <em>
          (Note: the circle sizes represent total dollar amounts, but the
          smaller donations are grouped in bundles for browser performance
          reasons)
        </em>
      </p>
      <p>
        Click "Fund It!" below to see how much each candidate would get when the
        first $1,000 of every donation is matched.
      </p>
    </React.Fragment>
  ),
  4: (
    <React.Fragment>
      <p>
        As the totals show, Alice received a healthy boost, but Bill is still
        firmly in the lead.
      </p>
      <p>
        While matching systems like this are effective, they come with some
        problems:
      </p>
      <ul>
        <li>
          If a limit is set on how much someone can donate, wealthy donors tend
          to just exert influence through less transparent channels (lobbying,{" "}
          <a
            href="https://www.opensecrets.org/pacs/superpacs.php"
            target="_blank"
          >
            "Super PACs"
          </a>
          , Mar-a-Lago memberships, etc).
        </li>
        <li>
          The matching threshold is fairly arbitrary and subject to being
          changed by whoever is currently in power
        </li>
        <li>
          Because of the reasons listed above, systems like this can cease being
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
        Rather than matching each donation up to the arbitrary $1,000 threshold,
        the L.R. formula will be used to determine how the public funds will be
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
      donations. In this scenario, Alice would end up with a healthy lead over
      Bill, which is appropriate considering she is a far more popular
      candidate.
    </p>
  )
};
