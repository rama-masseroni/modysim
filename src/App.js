import { useFormik } from "formik";
import "./App.css";
import Header from "./Header";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Button, Slider, TextField } from "@mui/material";
import marks from "./marks";
import { all, create, eigs, map } from "mathjs";
import { determinant, EigenvalueDecomposition, Matrix } from "ml-matrix";
import { Calculate } from "@mui/icons-material";

const math = create(all);
let p = 0;
let q = 0;
const matrix = Matrix.zeros(2, 2);
const eigenspace_1 = Matrix.zeros(2, 2);
const eigenspace_2 = Matrix.zeros(2, 2);
const eigenvector_1 = Matrix.zeros(2, 1);
const eigenvector_2 = Matrix.zeros(2, 1);

export default function App() {
  const [a_value, setAValue] = useState(0);
  const [b_value, setBValue] = useState(0);
  const [c_value, setCValue] = useState(0);
  const [d_value, setDValue] = useState(0);

  const [eigenvalues, setEVas] = useState();

  const [submission, setSubmission] = useState(false);

  function get_EVXs() {
    matrix.set(0, 0, a_value);
    matrix.set(0, 1, b_value);
    matrix.set(1, 0, c_value);
    matrix.set(1, 1, d_value);

    console.log(matrix);

    p = matrix.trace();
    q = determinant(matrix);

    // setEV1(math.eigs(matrix, 3));

    let eigen_decomp = new EigenvalueDecomposition(matrix);
    let aux = eigen_decomp.realEigenvalues;
    setEVas(aux);
    eigenspace_1.add(matrix);
    eigenspace_2.add(matrix);

    eigenspace_1.set(0, 0, a_value - aux[0]);
    eigenspace_1.set(0, 1, b_value);
    eigenspace_1.set(1, 0, c_value);
    eigenspace_1.set(1, 1, d_value - aux[0]);

    eigenspace_2.set(0, 0, a_value - aux[1]);
    eigenspace_2.set(0, 1, b_value);
    eigenspace_2.set(1, 0, c_value);
    eigenspace_2.set(1, 1, d_value - aux[1]);

    console.log(eigenspace_1);
    console.log(eigenspace_2);

    // setEVes(eigen_decomp.eigenvectorMatrix);
    setSubmission(true);
  }

  function check_eigenvectors(){

  }

  useEffect(() => {
    console.log("Autovector 1: " + eigenspace_1);
    console.log("Autovector 2: " + eigenspace_2);
  }, []);

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
              gabelDisplay="auto"
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
            onClick={() => get_EVXs()}
            // onSubmit={formik.handleSubmit}
          >
            Calcular
          </Button>
          {!submission ? null : (
            <>
              <a>Autovalores</a>
              {eigenvalues}
              <div className="autoparameters">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ flexDirection: "column" }}>
                    <h3>A - Lambda 1</h3>
                    <subtitle>{eigenspace_1.data.toString()}</subtitle>
                    <div className="slider" style={{ flexDirection: "row" }}>
                      <TextField
                        type={"number"}
                        variant="filled"
                        id="eigenvalue_1-x"
                        name="eigenvalue_1-x"
                        label="Autovector 1-x"
                        onChange={(event) =>
                          eigenvector_1.set(0, 0, event.target.value)
                        }
                        // error={formik.touched.a && formik.errors.a}
                        // helperText={formik.touched.a && formik.errors.a}
                        valueLabelDisplay="auto"
                      />

                      <TextField
                        type={"number"}
                        variant="filled"
                        id="eigenvalue_1-y"
                        name="eigenvalue_1-y"
                        label="Autovector 1-y"
                        onChange={(event) =>
                          eigenvector_1.set(1, 0, event.target.value)
                        }
                        // error={formik.touched.a && formik.errors.a}
                        // helperText={formik.touched.a && formik.errors.a}
                      />
                    </div>
                  </div>
                  <div style={{ flexDirection: "column" }}>
                    <h3>A - Lambda 2</h3>
                    <subtitle>{eigenspace_2.data.toString()}</subtitle>
                    <div className="slider" style={{ flexDirection: "row" }}>
                      <TextField
                        type={"number"}
                        id="eigenvalue_2-x"
                        name="eigenvalue_2-x"
                        label="Autovector 2-x"
                        variant="filled"
                        onChange={(event) =>
                          eigenvector_2.set(0, 0, event.target.value)
                        }
                        // error={formik.touched.a && formik.errors.a}
                        // helperText={formik.touched.a && formik.errors.a}
                        valueLabelDisplay="auto"
                      />

                      <TextField
                        type={"number"}
                        variant="filled"
                        id="eigenvalue_2-y"
                        name="eigenvalue_2-y"
                        label="Autovector 2-y"
                        onChange={(event) =>
                          eigenvector_2.set(1, 0, event.target.value)
                        }
                        // error={formik.touched.a && formik.errors.a}
                        // helperText={formik.touched.a && formik.errors.a}
                      />
                    </div>
                  </div>
                </div>
                <Button
                  variant="contained"
                  onClick={() => alert(eigenvector_1 + '\n' + eigenvector_2)}
                  // onSubmit={formik.handleSubmit}
                >
                  Confirmar AVes
                </Button>
              </div>
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
