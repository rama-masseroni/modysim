import React, { PureComponent, useEffect } from "react";
import "../App.css";
import katex from "katex";
import * as algebra from "algebra.js";
import functionPlot from "function-plot";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import {Matrix} from "ml-matrix"

export default function Display({ p, q, url, ev1, ev2 }) {
  const pp = p;
  const qq = q;
  const imagen = url;
  const eq1 = algebra.parse("q");
  const eq2 = algebra.parse("(p^2)*(1/4)");
  const q_p_graph = new algebra.Equation(eq1, eq2);
  console.log(q_p_graph.toString());
  const graph = algebra.toTex(q_p_graph);

  // console.log(ev1.);
  console.log(ev2);

  useEffect(() => {
    console.log(qq);
    console.log(pp);
    console.log(imagen);
    functionPlot({
      title: q_p_graph.toString(),
      target: "#quadratic-with-options",
      width: 500,
      height: 455,
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
        },
        {
          points: [[pp, qq]],
          fnType: "points",
          graphType: "scatter",
        },
        {
          vector: [ev1[0], ev1[1]],
          graphType: "polyline",
          fnType: "vector",
        },
        {
          vector: [-ev1[0], -ev1[1]],
          graphType: "polyline",
          fnType: "vector",
        },
        {
          vector: [ev2[0], ev2[1]],
          graphType: "polyline",
          fnType: "vector",
        },
        {
          vector: [-ev2[0], -ev2[1]],
          graphType: "polyline",
          fnType: "vector",
        },
      ],
    });

    return () => {};
  }, []);

  return (
    <>
      <div className="equation">
        <a>Test equation child component</a>
      </div>
      <div className="graphs_container">
        <div
          id="quadratic-with-options"
          style={{ backgroundColor: "white" }}
        ></div>
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
