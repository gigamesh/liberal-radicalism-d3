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
        limit at $200, apportioned from a fund of $450,000.
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
        of $500,000. Alice received less in total funding, however she has far
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
        first $200 of every donation is matched.
      </p>
    </React.Fragment>
  ),
  4: (
    <React.Fragment>
      <p>
        As the totals show, Alice received a very healthy boost, but Bill is
        still in the lead.
      </p>
      <p>
        While matching systems like this are effective at making fund raising
        more democratic, they come with some problems:
      </p>
      <ul>
        <li>
          If a limit is set on how much someone can donate, wealthy donors are
          incentivized exert influence through less transparent channels:
          lobbying,{" "}
          <a
            href="https://www.opensecrets.org/pacs/superpacs.php"
            target="_blank"
          >
            "Super PACs"
          </a>
          , Mar-a-Lago memberships, etc.
        </li>
        <li>
          The matching threshold also encourages wealthy patrons to put their
          money elsewhere because it's typically a miniscule fraction of the
          total amount they give. In the case of Bill's top contributor, only
          0.04% of his donation was matched (the barely-visible small yellow dot
          next to the biggest green one).
        </li>
        <li>
          The matching threshold is fairly arbitrary and prone to being
          manipulated by whoever is currently in power.
        </li>
        <li>
          Matching systems in politics have a tendency to get bogged down with
          arcane rules and are poorly managed, making them less useful over
          time. For example, most major U.S. presidential candidates haven't
          accepted public funding since 2008 because associated limits on
          spending haven't been increased with campaign costs.
        </li>
      </ul>
    </React.Fragment>
  ),

  5: (
    <React.Fragment>
      <p>
        Now let's re-run the campaign using the Liberal Radicalism mechanism.
      </p>
      <p>
        Rather than matching each donation up to the arbitrary $200 threshold,
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
    <React.Fragment>
      <p>
        In this scenario, Alice would end up with a slight lead over Bill, which
        is appropriate considering she is a far more popular candidate.
      </p>
      <p>
        The funding benefit is subtle, but what's especially interesting is that
        it is acheived in a fluid manner that doesn't lead to problematic
        incentives. This is best illustrated by the increased amount that Bill's
        top donor's contribution is weighted in the matching fund (see the
        yellow dot next to the largest green dot).{" "}
      </p>
      <p>
        That is all to say that the L.R. mechanism could potentially be a path
        toward campaign finance reform, coaxing political "dark money" into the
        light.
      </p>
    </React.Fragment>
  ),
  7: (
    <React.Fragment>
      <p>
        The beauty of L.R. is that it optimizes democratic funding of public
        goods in a fluid manner, without the need for arbitrary thresholds. This
        quality makes its potential applications and benefits to society
        far-reaching.
      </p>
      <p>
        As capitalism{" "}
        <a
          href="https://en.wikipedia.org/wiki/Capital_in_the_Twenty-First_Century"
          target="_blank"
        >
          centralizes wealth and power
        </a>{" "}
        in an economy of privately-controlled personal data repositories and
        artificial intelligence algorithms, it's imperitive that publicly shared
        goods like political campaigns, journalism, and open-source software
        receive ample funding. The L.R. mechanism may prove to be a powerful
        tool in that effort.
      </p>
    </React.Fragment>
  )
};
