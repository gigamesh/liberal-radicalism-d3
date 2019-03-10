import * as d3 from "d3";

const windowWidth = document.documentElement.clientWidth;
const windowHeight = document.documentElement.clientHeight;
/*
 * Code adapted from:
 * http://vallandingham.me/gates_bubbles/
 *
 */

function bubbleChart(width, height) {
  const tierPad = height * 0.2;

  // Locations to move bubbles towards, depending
  // on which view mode is selected.
  const center = { x: width / 2, y: height / 2 };

  const tierScale = d3
    .scaleLinear()
    .domain([0, 5])
    .range([0, height - tierPad * 2]);

  const tierLevels = {
    twoThouToLimitAmount: {
      text: "$2k - $2,700 (limit)"
    },
    oneThouTo2000Amount: {
      text: "$1k - $1999.99"
    },
    fiveHundredTo1000Amount: {
      text: "$500 - 999.99"
    },
    twoHundredTo500Amount: {
      text: "$200 - 499.99"
    },
    fiftyTo200Amount: {
      text: "$50 - 199.99"
    },
    zeroTo50Amount: {
      text: "$0 - 49.99"
    }
  };

  let tierLevelKeys = Object.keys(tierLevels);
  tierLevelKeys.forEach((k, i) => {
    tierLevels[k].y = tierScale(i) + tierPad;
  });

  const candidates = {
    "Bernie Sanders": { x: center.x - width / 4 },
    "Hillary Clinton": { x: center.x },
    "Martin O'Malley": { x: center.x + width / 4 }
  };

  // @v4 strength to apply to the position forces
  const forceStrength = 0.03;

  // These will be set in create_nodes and create_vis
  let svg = null;
  let bubbles = null;
  let nodes = [];

  // Charge function that is called for each node.
  // As part of the ManyBody force.
  // This is what creates the repulsion between nodes.
  //
  // Charge is proportional to the diameter of the
  // circle (which is stored in the radius attribute
  // of the circle's associated data.
  //
  // This is done to allow for accurate collision
  // detection with nodes of different sizes.
  //
  // Charge is negative because we want nodes to repel.
  // @v4 Before the charge was a stand-alone attribute
  //  of the force layout. Now we can use it as a separate force!
  function charge(d) {
    return -Math.pow(d.radius, 2) * forceStrength;
  }

  const fillColor = d3
    .scaleOrdinal()
    .domain(["high", "medium", "low"])
    .range(["#e7f7d4", "#a3bc85", "#5a823d"]);

  const simulationFactory = center => {
    const sim = d3
      .forceSimulation()
      .velocityDecay(0.15)
      .force(
        "x",
        d3
          .forceX()
          .strength(forceStrength)
          .x(center.x)
      )
      .force("charge", d3.forceManyBody().strength(charge))
      .on("tick", ticked);

    // @v4 Force starts up automatically,
    //  which we don't want as there aren't any nodes yet.
    sim.stop();

    return sim;
  };

  const simulation = simulationFactory(center);

  /*
   * This data manipulation function takes the raw data from
   * the CSV file and converts it into an array of node objects.
   * Each node will store data and visualization values to visualize
   * a bubble.
   *
   * rawData is expected to be an array of data objects, read in from
   * one of d3's loading functions like d3.csv.
   *
   * This function returns the new node array, with a node in that
   * array for each element in the rawData input.
   */
  function createNodes(rawData) {
    // Use the max amount in the data as the max in the scale's domain
    // note we have to ensure the amount is a number.

    const maxAmount = d3.max(rawData, function(d) {
      return +d.size;
    });

    // Sizes bubbles based on area.
    // @v4: new flattened scale names.
    const radiusScale = d3
      .scaleSqrt()
      .domain([0, maxAmount])
      .range([0, height * 0.016]);

    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on
    // working with data.
    const myNodes = rawData.map(function(d) {
      return {
        id: d.id,
        radius: radiusScale(+d.size),
        name: d.name,
        text: tierLevels[d.tier].text,
        tier: d.tier,
        x: Math.random() * 900,
        y: Math.random() * 800
      };
    });

    // sort them to prevent occlusion of smaller nodes.
    myNodes.sort(function(a, b) {
      return b.radius - a.radius;
    });

    return myNodes;
  }

  /*
   * Callback function that is called after every tick of the
   * force simulation.
   * Here we do the acutal repositioning of the SVG circles
   * based on the current x and y values of their bound node data.
   * These x and y values are modified by the force simulation.
   */
  function ticked() {
    bubbles
      .attr("cx", function(d) {
        return d.x;
      })
      .attr("cy", function(d) {
        return d.y;
      });
  }

  function groupBubbles(xPos) {
    hideTierLabels();

    simulation
      .force(
        "y",
        d3
          .forceY()
          .strength(forceStrength)
          .y(center.y)
      )
      .force(
        "x",
        d3
          .forceX()
          .strength(forceStrength)
          .x(xPos)
      );

    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }

  function groupBubbles() {
    hideTierLabels();

    simulation.force(
      "y",
      d3
        .forceY()
        .strength(forceStrength)
        .y(center.y)
    );

    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }

  function splitBubbles() {
    showTierLabels();

    simulation
      .force(
        "y",
        d3
          .forceY()
          .strength(forceStrength)
          .y(d => {
            return tierLevels[d.tier].y;
          })
      )
      .force(
        "x",
        d3
          .forceX()
          .strength(forceStrength)
          .x(d => {
            return candidates[d.name].x;
          })
      );

    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }

  function hideTierLabels() {
    svg.selectAll(".tier-label").remove();
  }

  function showTierLabels() {
    const tierLabels = d3.keys(tierLevels);
    const tierTitle = svg.selectAll(".tier-label").data(tierLabels);
    const tierX = width * 0.15;

    tierTitle
      .enter()
      .append("text")
      .attr("class", "tier-label")
      .attr("y", key => tierLevels[key].y)
      .attr("x", tierX)
      .attr("text-anchor", "end")
      .text(d => tierLevels[d].text);
  }

  function toggleDisplay(displayName) {
    if (displayName === "donation_tiers") {
      splitBubbles();
    } else {
      groupBubbles();
    }
  }

  /*
   * Main entry point to the bubble chart. This function is returned
   * by the parent closure. It prepares the rawData for visualization
   * and adds an svg element to the provided selector and starts the
   * visualization creation process.
   *
   * selector is expected to be a DOM element or CSS selector that
   * points to the parent element of the bubble chart. Inside this
   * element, the code will add the SVG continer for the visualization.
   *
   * rawData is expected to be an array of data objects as provided by
   * a d3 loading function like d3.csv.
   */
  function chart(selector, rawData) {
    // convert raw data into nodes data
    nodes = createNodes(rawData);

    // Create a SVG element inside the provided selector
    // with desired size.
    svg = d3
      .select(selector)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Bind nodes data to what will become DOM elements to represent them.
    bubbles = svg.selectAll(".bubble").data(nodes, function(d) {
      return d.id;
    });

    // Create new circle elements each with class `bubble`.
    // There will be one circle.bubble for each object in the nodes array.
    // Initially, their radius (r attribute) will be 0.
    // @v4 Selections are immutable, so lets capture the
    //  enter selection to apply our transtition to below.
    const bubblesE = bubbles
      .enter()
      .append("circle")
      .classed("bubble", true)
      .attr("r", 0)
      .attr("fill", function(d) {
        return fillColor(d.text);
      })
      .attr("stroke", function(d) {
        return d3.rgb(fillColor(d.text)).darker([3]);
      })
      .attr("stroke-width", 0.5);

    // @v4 Merge the original empty selection and the enter selection
    bubbles = bubbles.merge(bubblesE);

    // Fancy transition to make bubbles appear, ending with the
    // correct radius
    bubbles
      .transition()
      .duration(2000)
      .attr("r", function(d) {
        return d.radius;
      });

    simulation.nodes(nodes);

    // Add the candidate names
    const candidateTitleData = Object.keys(candidates);
    const candidateTitle = svg.selectAll(".candidate").data(candidateTitleData);

    candidateTitle
      .enter()
      .append("text")
      .attr("class", "candidate")
      .attr("x", function(d) {
        return candidates[d].x;
      })
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .text(function(d) {
        return d;
      });

    // Set initial layout to single group.
    groupBubbles(center.x);
  }

  // return the chart function from closure.
  return { chart, toggleDisplay };
}

function setupButtons(chart) {
  d3.select("#toolbar")
    .selectAll(".button")
    .on("click", function() {
      // Remove active class from all buttons
      d3.selectAll(".button").classed("active", false);
      // Find the button just clicked
      var button = d3.select(this);

      // Set it as the active button
      button.classed("active", true);

      // Get the id of the button
      var buttonId = button.attr("id");

      // Toggle the bubble chart based on
      // the currently clicked button.
      chart.toggleDisplay(buttonId);
    });
}

export { bubbleChart, setupButtons };
