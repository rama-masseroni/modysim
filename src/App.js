import { useFormik } from "formik";
import "./App.css";
import Header from "./Header";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Button, Slider, TextField } from "@mui/material";
import marks from "./marks";
import { all, create, eigs, map } from "mathjs";
import { EigenvalueDecomposition, Matrix } from 'ml-matrix';


const math = create(all);
let p = 0;
let q = 0;

export default function App() {
  const [eigenvalues, setEVas] = useState();
  const [eigenvectors, setEVes] = useState();

  const [a_value, setAValue] = useState(0);
  const [b_value, setBValue] = useState(0);
  const [c_value, setCValue] = useState(0);
  const [d_value, setDValue] = useState(0);

  const [submission, setSubmission] = useState(false);

  const matrix = Matrix.zeros(2,2);
  useEffect(() => {
    // setEV1();
    // setSubmission(false);

    console.log(eigenvalues);
    console.log(eigenvectors);
    // console.log('Autovector 2: ' + eigenvalue_2);
  }, [submission]);

  function valueText(value) {
    return `${value}°C`;
  }

  return (
    <div className="App">
      <Header />
      <div className="body">
        <div className="inputs">
          <h2>test inputs</h2>
          <div className="slider">
            <Slider
              id="a"
              name="a"
              aria-label="a value"
              getAriaValueText={valueText}
              marks={marks}
              step={0.25}
              min={-5}
              max={5}
              defaultValue={0}
              onChange={(event, newNumber) => setAValue(newNumber)}
              // error={formik.touched.a && formik.errors.a}
              // helperText={formik.touched.a && formik.errors.a}
              valueLabelDisplay="auto"
            />

            <Slider
              className="slider"
              id="b"
              name="b"
              aria-label="b value"
              getAriaValueText={valueText}
              marks={marks}
              step={0.25}
              min={-5}
              max={5}
              defaultValue={0}
              onChange={(event, value) => setBValue(value)}
              // error={formik.touched.a && formik.errors.a}
              // helperText={formik.touched.a && formik.errors.a}
              valueLabelDisplay="auto"
            />

            <Slider
              className="slider"
              id="c"
              name="c"
              aria-label="c value"
              getAriaValueText={valueText}
              marks={marks}
              step={0.25}
              min={-5}
              max={5}
              defaultValue={0}
              onChange={(event, value) => setCValue(value)}
              // error={formik.touched.a && formik.errors.a}
              // helperText={formik.touched.a && formik.errors.a}
              valueLabelDisplay="auto"
            />

            <Slider
              className="slider"
              id="d"
              name="d"
              aria-label="d value"
              getAriaValueText={valueText}
              marks={marks}
              step={0.25}
              min={-5}
              max={5}
              defaultValue={0}
              onChange={(event, value) => setDValue(value)}
              // error={formik.touched.a && formik.errors.a}
              // helperText={formik.touched.a && formik.errors.a}
              valueLabelDisplay="auto"
            />
          </div>

          <Button
            variant="contained"
            onClick={() => {
              console.log(a_value);
              console.log(b_value);
              console.log(c_value);
              console.log(d_value);

              matrix.set(0, 0, a_value);
              matrix.set(0, 1, b_value);
              matrix.set(1, 0, c_value);
              matrix.set(1, 1, d_value);

              p = math.trace(matrix);
              q = math.det(matrix);
              console.log(p);
              console.log(q);

              // setEV1(math.eigs(matrix, 3));

              let eigentest =  new EigenvalueDecomposition(matrix);
              setEVas(eigentest.realEigenvalues);
              setEVes(eigentest.eigenvectorMatrix);
              setSubmission(!submission);
            }}
            // onSubmit={formik.handleSubmit}
          >
            Calcular
          </Button>
          {!submission ? null : (
            <>
              <text>Autovalores</text>
              <text>Autovectores</text>
            </>
          )}
        </div>
        <div className="display">
          <h2>test display</h2>
        </div>
      </div>
    </div>
  );
}
