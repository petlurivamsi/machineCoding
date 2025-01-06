const trafficCone = (color, user, className = "", clearCell = false) => {
  let tokenDiv;

  // Select the div using the class or user ID
  if (className) {
    tokenDiv = d3.select(className);
  } else {
    tokenDiv = d3.select(`#token-${user}`);
  }

  if (clearCell) {
    const existingSvg = tokenDiv.select("svg");
    if (existingSvg.size() > 0) {
      existingSvg.remove();
    }

    return;
  }

  // Append an SVG to the div if no existing token was found
  const svg = tokenDiv
    .append("svg")
    .attr("viewBox", "0 0 100 100")
    .attr("width", 50) // Adjust size as needed
    .attr("height", 50);

  // Draw a traffic cone token inside the SVG
  svg
    .append("polygon")
    .attr("points", "50,50 40,80 60,80") // Cone shape
    .attr("fill", color); // Traffic cone color

  // Draw the base stripe (yellow)
  svg
    .append("rect")
    .attr("x", 40)
    .attr("y", 80)
    .attr("width", 20)
    .attr("height", 5)
    .attr("fill", "yellow");

  // Draw the middle stripe (white)
  svg
    .append("rect")
    .attr("x", 43)
    .attr("y", 70)
    .attr("width", 14)
    .attr("height", 7)
    .attr("fill", "white");
};

export default trafficCone;
