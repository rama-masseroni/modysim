import React, { PureComponent } from "react";
import "../App.css";
import katex from "katex";
import * as algebra from "algebra.js";
import functionPlot from "function-plot";

export default function Display(props) {
  const eq1 = algebra.parse("q");
  const eq2 = algebra.parse("(p^2)*(1/4)");
  const q_p_graph = new algebra.Equation(eq1, eq2);
  console.log(q_p_graph.toString());
  const graph = algebra.toTex(q_p_graph);

  functionPlot({
    title: q_p_graph.toString(),
    target: "#quadratic-with-options",
    width: 580,
    height: 400,
    disableZoom: true,
    xAxis: {
      label: "p - axis",
      domain: [-4, 4],
    },
    yAxis: {
      label: "q - axis",
      domain: [-2, 4],
    },
    data: [
      {
        fn: "y=(x^2)/4",
      },
    ],
  });

  return (
    <>
      <div className="equation">
        <a>Test equation child component</a>
      </div>
      <div className="graphs_container">
        <div id = "quadratic-with-options"></div>
      </div>
    </>
  );
}
