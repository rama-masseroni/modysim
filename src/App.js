import { useFormik } from "formik";
import "./App.css";
import Header from "./Header";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Button, Slider, TextField } from "@mui/material";
import marks from "./marks";
import { all, create, eigs, map } from "mathjs";
import { determinant, EigenvalueDecomposition, Matrix } from "ml-matrix";

const math = create(all);
let p = 0;
let q = 0;

export default function App() {
  const [a_value, setAValue] = useState(0);
  const [b_value, setBValue] = useState(0);
  const [c_value, setCValue] = useState(0);
  const [d_value, setDValue] = useState(0);
  
  const matrix = Matrix.zeros(2, 2);
  
  const [eigenvalues, setEVas] = useState();
  
  const eigenspace_1 = Matrix.zeros(2,2);
  const eigenspace_2 = Matrix.zeros(2,2);
  const [eigenvectors, setEVs] = useState();

  const [submission, setSubmission] = useState(false);

  useEffect(() => {
    // setEV1();
    // setSubmission(false);

    // console.log(eigenvalues);
    // console.log(eigenvectors);
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

              matrix.set(0, 0, a_value);
              matrix.set(0, 1, b_value);
              matrix.set(1, 0, c_value);
              matrix.set(1, 1, d_value);

              p = matrix.trace();
              q = determinant(matrix);

              // setEV1(math.eigs(matrix, 3));

              let eigen_decomp = new EigenvalueDecomposition(matrix);
              let aux = eigen_decomp.realEigenvalues;
              setEVas(aux);
              // setEVes(eigen_decomp.eigenvectorMatrix);


              eigenspace_1.add(matrix);
              eigenspace_2.add(matrix);
              
              eigenspace_1.set(0,0, a_value - eigenvalues[0])
              eigenspace_1.set(1,1, d_value - eigenvalues[0])
              
              eigenspace_2.set(0,0, a_value - eigenvalues[1])
              eigenspace_2.set(1,1, d_value - eigenvalues[1])
              
              console.log(eigenspace_1);
              console.log(eigenspace_2);
              
              setSubmission(!submission);
            }}
            // onSubmit={formik.handleSubmit}
          >
            Calcular
          </Button>
          {!submission ? null : (
            <div className="autoparameters">
              <text>Autovalores</text>
              {eigenvalues}
              <text>Autovectores</text>
              <div className="slider">
                <Slider
                  id="eigenvalue_1"
                  name="eigenvalue_1"
                  aria-label="eigenvalue_1 value"
                  getAriaValueText={valueText}
                  marks={marks}
                  step={0.25}
                  min={-5}
                  max={5}
                  defaultValue={0}
                  onChange={(event, value) => console.log(value)}
                  // error={formik.touched.a && formik.errors.a}
                  // helperText={formik.touched.a && formik.errors.a}
                  valueLabelDisplay="auto"
                />

                <Slider
                  className="slider"
                  id="eigenvalue_2"
                  name="eigenvalue_2"
                  aria-label="eigenvalue_2 value"
                  getAriaValueText={valueText}
                  marks={marks}
                  step={0.25}
                  min={-5}
                  max={5}
                  defaultValue={0}
                  onChange={(event, value) => console.log(value)}
                  // error={formik.touched.a && formik.errors.a}
                  // helperText={formik.touched.a && formik.errors.a}
                  valueLabelDisplay="auto"
                />
              </div>
            </div>
          )}
        </div>
        <div className="display">
          <h2>test display</h2>
        </div>
      </div>
    </div>
  );
}
