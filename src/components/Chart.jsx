import React, { useEffect, useRef } from "react";
import useVendors from "../hooks/useVendors";
import { select, tree, hierarchy, linkHorizontal } from "d3";
import diagramIcon from "../assets/images/diagram.png";

function Chart() {
  const [vendors] = useVendors();
  const svgRef = useRef(null);

  useEffect(() => {
    if (vendors) {
      const width = 960;
      const height = 500;

      const margin = {
        right: 150,
        left: 150,
      };

      const svg = select(svgRef.current);
      svg.selectAll("*").remove();
      svg
        .attr("width", width + margin.right + margin.left)
        .attr("height", height);

      const treeLayout = tree().size([height, width]);

      let nodes = hierarchy(vendors);

      nodes = treeLayout(nodes);
      const moveInX = 120;

      const node = svg
        .selectAll(".node")
        .data(nodes.descendants())
        .enter()
        .append("g")
        .attr(
          "class",
          (d) => "node" + (d.children ? " node-parent" : " node-leaf")
        )
        .attr("transform", (d) => `translate(${d.y + moveInX},${d.x})`);

      const paths = treeLayout(nodes).links();
      const pathGenerator = linkHorizontal()
        .x((d) => d.y + moveInX)
        .y((d) => d.x);

      svg
        .selectAll("path")
        .data(paths)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "#1e81ce")
        .attr("stroke-width", 1)
        .attr("d", pathGenerator);

      node
        .append("circle")
        .attr("r", 2.5)
        .style("stroke", "gray")
        .style("fill", "#1e81ce");

      node
        .append("text")
        .attr("dy", ".01rem")
        .attr("x", (d) => (d.y === 0 ? -10 : d.parent && d.children ? 36 : 8))
        .attr("y", (d) => (d.parent && d.children ? -15 : 5))
        .style("text-anchor", (d) => (d.children ? "end" : "start"))
        .text((d) => d.data.name);
    }
  }, [vendors]);

  return (
    <>
      {vendors ? (
        <div className="px-5">
          <svg id="tree-layout" ref={svgRef}></svg>
        </div>
      ) : (
        <div className="h-4/5 flex flex-col justify-center items-center">
          <img width={350} src={diagramIcon} alt="tree diagram" />
          <span>Cargar datos</span>
        </div>
      )}
    </>
  );
}

export default Chart;
