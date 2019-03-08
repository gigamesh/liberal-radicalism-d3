import { floatingTooltip } from "./tooltip";
import * as d3 from "d3";

/*
 * Code adapted from:
 * http://vallandingham.me/gates_bubbles/
 *
 */

function bubbleChart(el) {
  const width = el.clientWidth;
  const height = width * 0.6;
  const topPadding = height * 0.03;

  // tooltip for mouseover functionality
  const tooltip = floatingTooltip("gates_tooltip", 240);

  // Locations to move bubbles towards, depending
  // on which view mode is selected.
  const center = { x: width / 2, y: height / 2 };

  const tierLevels = {
    2008: { x: width / 2, y: topPadding + height / 3 },
    2009: { x: width / 2, y: topPadding + height / 2 },
    2010: { x: width / 2, y: topPadding + (2 * height) / 3 }
  };

  const candidateTitleX = {
    "Bernie Sanders": 160,
    "Hillary Clinton": width / 2,
    "Martin O'Malley": width - 160
  };

  // @v4 strength to apply to the position forces
  const forceStrength = 0.05;

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

  // Here we create a force layout and
  // @v4 We create a force simulation now and
  //  add forces to it.
  var simulation = d3
    .forceSimulation()
    .velocityDecay(0.15)
    .force(
      "x",
      d3
        .forceX()
        .strength(forceStrength)
        .x(center.x)
    )
    .force(
      "y",
      d3
        .forceY()
        .strength(forceStrength)
        .y(center.y)
    )
    .force("charge", d3.forceManyBody().strength(charge))
    .on("tick", ticked);

  // @v4 Force starts up automatically,
  //  which we don't want as there aren't any nodes yet.
  simulation.stop();

  // Nice looking colors - no reason to buck the trend
  // @v4 scales now have a flattened naming scheme
  var fillColor = d3
    .scaleOrdinal()
    .domain(["high", "medium", "low"])
    .range(["#e7f7d4", "#a3bc85", "#5a823d"]);

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
    // Use the max total_amount in the data as the max in the scale's domain
    // note we have to ensure the total_amount is a number.

    var maxAmount = d3.max(rawData, function(d) {
      return +d.total_amount;
    });

    // Sizes bubbles based on area.
    // @v4: new flattened scale names.
    var radiusScale = d3
      .scalePow()
      .exponent(0.5)
      .range([2, width * 0.045])
      .domain([0, maxAmount]);

    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on
    // working with data.
    var myNodes = rawData.map(function(d) {
      return {
        id: d.id,
        radius: radiusScale(+d.total_amount),
        value: +d.total_amount,
        name: d.grant_title,
        group: d.group,
        year: d.start_year,
        x: Math.random() * 900,
        y: Math.random() * 800
      };
    });

    // sort them to prevent occlusion of smaller nodes.
    myNodes.sort(function(a, b) {
      return b.value - a.value;
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

  function nodeTierPos(d) {
    return tierLevels[d.year].y;
  }

  function groupBubbles() {
    hideTierLabels();

    // @v4 Reset the 'x' force to draw the bubbles to the center.
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

    simulation.force(
      "y",
      d3
        .forceY()
        .strength(forceStrength)
        .y(nodeTierPos)
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

    tierTitle
      .enter()
      .append("text")
      .attr("class", "tier-label")
      .attr("y", key => tierLevels[key].y)
      .attr("font-size", 20)
      .attr("x", 40)
      .attr("text-anchor", "middle")
      .text(d => d);
  }

  /*
   * Function called on mouseover to display the
   * details of a bubble in the tooltip.
   */
  function showDetail(d) {
    // change outline to indicate hover state.
    d3.select(this).attr("stroke", "black");

    // var content =
    //   '<span class="name">Title: </span><span class="value">' +
    //   d.name +
    //   "</span><br/>" +
    //   '<span class="name">Amount: </span><span class="value">$' +
    //   addCommas(d.value) +
    //   "</span><br/>" +
    //   '<span class="name">Year: </span><span class="value">' +
    //   d.year +
    //   "</span>";

    // tooltip.showTooltip(content, d3.event);
  }

  function hideDetail(d) {
    // reset outline
    d3.select(this).attr("stroke", d3.rgb(fillColor(d.group)).darker());

    // tooltip.hideTooltip();
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
    var bubblesE = bubbles
      .enter()
      .append("circle")
      .classed("bubble", true)
      .attr("r", 0)
      .attr("fill", function(d) {
        return fillColor(d.group);
      })
      .attr("stroke", function(d) {
        return d3.rgb(fillColor(d.group)).darker([3]);
      })
      .attr("stroke-width", 0.5)
      .on("mouseover", showDetail)
      .on("mouseout", hideDetail);

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

    // Set the simulation's nodes to our newly created nodes array.
    // @v4 Once we set the nodes, the simulation will start running automatically!
    simulation.nodes(nodes);

    // Add the candidate names
    const candidateTitleData = d3.keys(candidateTitleX);
    const candidateTitle = svg.selectAll(".candidate").data(candidateTitleData);

    candidateTitle
      .enter()
      .append("text")
      .attr("class", "candidate")
      .attr("x", function(d) {
        return candidateTitleX[d];
      })
      .attr("font-size", 20)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .text(function(d) {
        return d;
      });

    // Set initial layout to single group.
    groupBubbles();
  }

  // return the chart function from closure.
  return { chart, toggleDisplay };
}

/*
 * Below is the initialization code as well as some helper functions
 * to create a new bubble chart instance, load the data, and display it.
 */

// var myBubbleChart = bubbleChart();
/*
 * Sets up the layout buttons to allow for toggling between view modes.
 */

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

/*
 * Helper function to convert a number into a string
 * and add commas to it to improve presentation.
 */
function addCommas(nStr) {
  nStr += "";
  var x = nStr.split(".");
  var x1 = x[0];
  var x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }

  return x1 + x2;
}

export { bubbleChart, setupButtons };
