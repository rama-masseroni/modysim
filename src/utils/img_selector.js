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

  const base_url =
    "https://github.com/MelodRAMAtick/modysim/blob/42ffe7967f5b2717301048dba88fd14fe5731eab/src/imgs/";
  //   console.log(e1);
  //   console.log(e2);
  console.log(p);
  console.log(q);

  if (q < 0) return base_url + "p%20y%20q%20menor%200.png";
  if (q > 0) {
    if (0 < p && q < result)
      return base_url + "q%2menor%20(p%5E2)%20sobre%204.png";
    if (p < 0 && q < result)
      return base_url + "q%20menor%20(-p%5E2)%20sobre%204.png";

    if (0 < p && result === q)
      return base_url + "q%20=%20(p%5E2)%20sobre%204.png";
    if (p < 0 && q === result)
      return base_url + "q%20=%20(-p%5E2)%20sobre%204.png";

    if (0 < p && result < q)
      return base_url + "q%20mayor%20q(p)%20(repulsor).png";
    if (p < 0 && q > result)
      return base_url + "q%20mayor%20q(p)%20(atractor).png";
    if (p === 0 && q > result)
      return base_url + "p=0%20y%20q%20mayor%20q(p).png";
  }
  if (q === 0) {
    if (p === 0) return base_url + "p=q=0.png";
    if (p < 0) return base_url + "p%20menor%200;q=0.png";
    if (p > 0) return base_url + "p%20mayor%200;q=0.png";
  };
}
