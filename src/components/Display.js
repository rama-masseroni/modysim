import React, { PureComponent, useEffect } from "react";
import "../App.css";
import katex from "katex";
import * as algebra from "algebra.js";
import functionPlot from "function-plot";


export default function Display(p, q) {
  const pp= p.p;
  const qq= p.q;
  const eq1 = algebra.parse("q");
  const eq2 = algebra.parse("(p^2)*(1/4)");
  const q_p_graph = new algebra.Equation(eq1, eq2);
  console.log(q_p_graph.toString());
  const graph = algebra.toTex(q_p_graph);
  
  useEffect(() => {
    console.log(qq);
    console.log(pp);
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
          points:[
            [pp,qq],
          ],  
          fnType:"points",
          graphType:"scatter",
        }
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
        <div id="quadratic-with-options" style={{backgroundColor:'white'}}></div>
        <div className="generic_graphs">
          <p>test</p>
        </div>
      </div>
    </>
  );
}
