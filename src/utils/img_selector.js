import React from "react";
import { all, create, eigs, i, map, zeros } from "mathjs";

// import '.src/imgs';

export default function imgSelector(eigenvalues, p, q) {
  const math = create(all);

  let scope = {
    x: p,
  };

  let result = math.evaluate("(x^2)/4", scope);
  console.log(result);

  // const base_url =
  // "https://res.cloudinary.com/dv57wpzku/image/upload/v1667597138/diagramas/"
   //   console.log(e1);
  //   console.log(e2);
  console.log(p);
  console.log(q);

  if (q < 0) return  "diagramas/p_y_q_menor_0_azmvfw.png";
  if (q > 0) {
    if (0 < p && q < result)
      return  "diagramas/q_menor_p_2_sobre_4_etszco.png";
    if (p < 0 && q < result)
      return  "diagramas/q_menor_-p_2_sobre_4_ytjl6m.png";

    if (0 < p && result === q)
      return  "diagramas/q_p_2_sobre_4_qgh08k.png";
    if (p < 0 && q === result)
      return  "diagramas/q_-p_2_sobre_4_t3mhmp.png";

    if (0 < p && result < q)
      return  "diagramas/q_mayor_q_p_repulsor_rrqb1v.png";
    if (p < 0 && q > result)
      return  "diagramas/q_mayor_q_p_atractor_twb9bm.png";
    if (p === 0 && q > result)
      return  "diagramas/p_0_y_q_mayor_q_p_ct3guu.png";
  }
  if (q === 0) {
    if (p === 0) return  "diagramas/p_q_0_aovh3n.png";
    if (p < 0) return  "diagramas/p_menor_0_q_0_niycig.png";
    if (p > 0) return  "diagramas/p_mayor_0_q_0_rubjga.png";
  };
}
