import React, { PureComponent, useEffect, useState } from "react";
import "../App.css";
import katex from "katex";
import * as algebra from "algebra.js";
import functionPlot from "function-plot";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import { Matrix } from "ml-matrix";
import { MathJax } from "better-react-mathjax";
import { Fab } from "@mui/material";
import { Update } from "@mui/icons-material";

export default function Display({ p, q, url, ev1, ev2, values }) {
  const pp = p;
  const qq = q;
  const imagen = url;
  const eq1 = algebra.parse("q");
  const eq2 = algebra.parse("(p^2)*(1/4)");
  const q_p_graph = new algebra.Equation(eq1, eq2);
  console.log(q_p_graph.toString());
  const graph = algebra.toTex(q_p_graph);

  const [graphView, setGraphView] = useState(false);
  // var options = {
  //   target: "#quadratic-with-options",
  //   width: 500,
  //   height: 455,
  //   grid: true,
  //   disableZoom: true,

  //   xAxis: {
  //     label: "p - axis",
  //     domain: [-4, 4],
  //   },
  //   yAxis: {
  //     label: "q - axis",
  //     domain: [-4, 4],
  //   },
  // };
  console.log(values);

  const xx = new algebra.Expression("x");
  const xy = new algebra.Expression("y");

  const xaux = new algebra.Equation(
    xx.multiply(values[0]).add(xy.multiply(values[1])),
    0
  );
  console.log(xaux.toString());
  const xdot = xaux.solveFor("y");
  console.log(xdot.toString());

  let yaux = new algebra.Equation(
    xx.multiply(values[2]).add(xy.multiply(values[3])),
    0
  );
  console.log(yaux.toString());
  if (values[3] === 0)
    yaux = new algebra.Equation(xx.multiply(values[2]).add(xy.multiply(1)), 0);

  const ydot = yaux.solveFor("y");
  console.log(ydot.toString());

  console.log(ev1);
  console.log(ev2);

  useEffect(() => {
    console.log(graphView);

    if (graphView === false) {
      // delete options.data;
      functionPlot({
        target: "#quadratic-with-options",
        width: 500,
        height: 455,
        grid: true,
        disableZoom: true,

        xAxis: {
          label: "p - axis",
          domain: [-4, 4],
        },
        yAxis: {
          label: "q - axis",
          domain: [-4, 4],
        },
        data: [
          {
            fn: "y=(x^2)/4",
            graphType: "polyline",
            skipTip: true,
          },
        ],
      });
    } else {
      // delete options.data;
      functionPlot({
        target: "#quadratic-with-options",
        width: 500,
        height: 455,
        grid: true,
        disableZoom: true,

        xAxis: {
          label: "p - axis",
          domain: [-4, 4],
        },
        yAxis: {
          label: "q - axis",
          domain: [-4, 4],
        },
        data: [
          {
            fn: "y=" + xdot.toString(),
            graphType: "scatter",
            nSamples: 100,
            skipTip: true,
            color: "purple",
          },
          {
            fn: "y=" + ydot.toString(),
            graphType: "scatter",
            nSamples: 100,
            skipTip: true,
            color: "magenta",
          },
          {
            points: [[pp, qq]],
            fnType: "points",
            graphType: "polyline",
            color: "black",
          },
          {
            vector: [ev1[0], ev1[1]],
            graphType: "polyline",
            fnType: "vector",
            color: "red",
          },
          {
            vector: [-ev1[0], -ev1[1]],
            graphType: "polyline",
            fnType: "vector",
            color: "red",
          },
          {
            vector: [ev2[0], ev2[1]],
            graphType: "polyline",
            fnType: "vector",
            color: "green",
          },
          {
            vector: [-ev2[0], -ev2[1]],
            graphType: "polyline",
            fnType: "vector",
            color: "green",
          },
        ],
      });
    }
    // console.log(options);
  }, [graphView]);

  return (
    <>
      <div className="equation">
        <MathJax>
          {"\\(\\large \\dot{X} = A \\times X ; \\space A = \\begin{pmatrix}"}{" "}
          {values[0]} {"&&"} {values[1]} {"\\\\"} {values[2]} {"&&"} {values[3]}{" "}
          {
            "\\end{pmatrix} \\Longrightarrow \\text{también entendible como} \\space A = f(n) = \\begin{cases}  \\dot{x} ="
          }{" "}
          {values[0]}
          {"*x + "}
          {values[1]}
          {"*y \\\\ \\dot{y} = "}
          {values[2]}
          {"*x + "}
          {values[3]}
          {"*y \\end{cases}\\)"}
        </MathJax>
      </div>
      <div className="graphs_container">
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <div
            id="quadratic-with-options"
            style={{
              backgroundColor: "white",
            }}
          ></div>
          <Fab id="test" onClick={() => setGraphView(!graphView)}>
            <Update />
          </Fab>
        </div>
        <div className="generic_graphs">
          <CloudinaryContext cloudName="dv57wpzku">
            <div>
              <Image publicId={imagen}>
                <Transformation height="455" crop="fill" />
              </Image>
            </div>
          </CloudinaryContext>
        </div>
      </div>
    </>
  );
}
