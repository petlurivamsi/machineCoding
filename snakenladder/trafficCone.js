const trafficCone = (color, user, className = "", clearCell = false) => {
  const coneWidth = 15; // Reduced size to 1/4th of the original
  const coneHeight = 15;

  let tokenDiv;

  // Select the div using the class or user ID
  if (className) {
    tokenDiv = d3.select(className);
  } else {
    tokenDiv = d3.select(`#token-${user}`);
  }

  if (clearCell) {
    // Remove existing SVG if clearCell is true
    const existingSvg = tokenDiv.select("svg");
    if (existingSvg.size() > 0) {
      existingSvg.remove();
    }
    return;
  }

  // Check if an existing SVG is present
  let svg = tokenDiv.select("svg");

  if (svg.size() === 0) {
    // Append a new SVG if not already present
    svg = tokenDiv
      .append("svg")
      .attr("class", "overlay-svg")
      .attr("viewBox", "0 0 100 100") // Keep original viewBox for proper scaling
      .attr("width", coneWidth)
      .attr("height", coneHeight);
  }

  // Clear existing SVG content
  // svg.selectAll("*").remove();

  // Define gradients for 3D effect
  const defs = svg.append("defs");
  defs
    .append("linearGradient")
    .attr("id", `cone-gradient-${user}`)
    .attr("x1", "0%")
    .attr("x2", "0%")
    .attr("y1", "0%")
    .attr("y2", "100%").html(`
      <stop offset="0%" stop-color="${color}" stop-opacity="0.8" />
      <stop offset="100%" stop-color="${color}" stop-opacity="1" />
    `);

  // Draw the cone body
  svg
    .append("polygon")
    .attr("points", "50,20 30,80 70,80") // Cone shape within original viewBox
    .attr("fill", `url(#cone-gradient-${user})`); // Use gradient for fill

  // Draw the base stripe (yellow)
  svg
    .append("rect")
    .attr("x", 30)
    .attr("y", 80)
    .attr("width", 40)
    .attr("height", 10)
    .attr("fill", "yellow");

  // Draw the middle stripe (white)
  svg
    .append("rect")
    .attr("x", 35)
    .attr("y", 60)
    .attr("width", 30)
    .attr("height", 10)
    .attr("fill", "white");

  // Add a shadow to the base
  svg
    .append("ellipse")
    .attr("cx", 50)
    .attr("cy", 85)
    .attr("rx", 25)
    .attr("ry", 5)
    .attr("fill", "rgba(0,0,0,0.2)");
};

export default trafficCone;
