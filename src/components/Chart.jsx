import React, { useEffect, useRef } from "react";
import useVendors from "../hooks/useVendors";
import { select, tree, hierarchy, linkHorizontal } from "d3";

function Chart() {
  const [vendors] = useVendors();
  const svgRef = useRef(null);

  useEffect(() => {
    if (vendors) {
      const height = document.getElementById("container").offsetHeight;
      const width = document.getElementById("container").offsetWidth;
      const treeLayout = tree().size([width, height]);
      //.separation((a) => (a.y = (a.depth * 0.5 * (height - 300)) / 4));
      const svg = select(svgRef.current);
      svg.selectAll("*").remove();
      svg.attr("width", 1000).attr("height", 1000);

      const root = hierarchy(vendors);
      const paths = treeLayout(root).links();
      const pathGenerator = linkHorizontal()
        .x((d) => d?.y)
        .y((d) => d?.x);

      svg
        .selectAll("path")
        .data(paths)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("d", pathGenerator);

      svg
        .selectAll("text")
        .data(root.descendants())
        .enter()
        .append("text")
        .attr("color", "black")
        .attr("font-size", "0.75rem")
        .attr("x", (d) => d?.y)
        .attr("y", (d) => d?.x)
        .text((d) => d.data.name);
    }
  }, [vendors]);

  return (
    <div id="container" className="h-full w-full p-4 overflow-auto">
      <div>
        <svg id="tree-layout" ref={svgRef}></svg>
      </div>
    </div>
  );
}

export default Chart;
