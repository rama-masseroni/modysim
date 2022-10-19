import React, { PureComponent } from "react";
import "../App.css";
import katex from "katex";
import * as algebra from "algebra.js";
import functionPlot from "function-plot";

export default function Display(props) {

    const q = new algebra.Expression('q');
    const p = new algebra.Expression('p');
    const q_p = new algebra.Equation(q, new algebra.Fraction(p.pow(2,false),4));
    const graph = algebra.toTex(q_p);    

  return (
    <>
      <div className="equation">
        <a>Test equation child component</a>
      </div>
      <div className="graphs_container">
        <a>Test graph container child component</a>
      </div>
    </>
  );
}
