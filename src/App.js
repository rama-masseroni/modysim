import { useFormik } from "formik";
import "./App.css";
import Header from "./Header";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Button, Slider, TextField } from "@mui/material";
import marks from "./marks";
import { all, create, map } from "mathjs";

const ParameterSchema = Yup.object().shape({
  a: Yup.number("Enter the a value for the A matrix").required(
    "Este parámetro es obligatorio!"
  ),
  b: Yup.number("Enter the b value for the A matrix"),
  c: Yup.number("Enter the c value for the A matrix").required(
    "Este parámetro es obligatorio!"
    ),
    d: Yup.number("Enter the d value for the A matrix"),
    
    // Autovectores 1 y 2; en principio serían arrays de 2 espacios
  });

  const math = create(all);
  let p = 0;
  let q = 0;
  
export default function App() {
  const [eigenvalue_1, setEV1] = useState([0, 0]);
  const [eigenvalue_2, setEV2] = useState([0, 0]);
  
  const matrix= math.zeros(2,2);
  // useEffect(() => {
  //   console.log('Autovector 1: ' + eigenvalue_1);
  //   console.log('Autovector 2: ' + eigenvalue_2);
  // }, []);

  function valueText(value) {
    return `${value}°C`;
  }

  const formik = useFormik({
    initialValues: {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
    },
    validationSchema: ParameterSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      matrix.set([0,0], values.a);
      matrix.set([0,1], values.b);
      matrix.set([1,0], values.c);
      matrix.set([1,1], values.d);
      console.log(matrix.valueOf());
      p= math.trace(matrix);
      q= math.det(matrix);
      console.log('P = tr(A) = '+p);
      console.log('Q = det(A) = '+q);
    },
  });

  return (
    <div className="App">
      <Header />
      <div className="body">
        <div className="inputs">
          <h2>test inputs</h2>
          <form onSubmit={formik.handleSubmit}>
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
                defaultValue={formik.values.a}
                value={formik.values.a}
                onChange={formik.handleChange}
                error={formik.touched.a && formik.errors.a}
                helperText={formik.touched.a && formik.errors.a}
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
                defaultValue={formik.values.b}
                value={formik.values.b}
                onChange={formik.handleChange}
                error={formik.touched.b && formik.errors.b}
                helperText={formik.touched.b && formik.errors.b}
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
                defaultValue={formik.values.c}
                value={formik.values.c}
                onChange={formik.handleChange}
                error={formik.touched.c && formik.errors.c}
                helperText={formik.touched.c && formik.errors.c}
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
                defaultValue={formik.values.d}
                value={formik.values.d}
                onChange={formik.handleChange}
                error={formik.touched.d && formik.errors.d}
                helperText={formik.touched.d && formik.errors.d}
                valueLabelDisplay="auto"
              />
            </div>

            <Button
              variant="contained"
              type="submit"
              // onSubmit={formik.handleSubmit}
            >
              Calcular
            </Button>
          </form>
        </div>
        <div className="display">
          <h2>test display</h2>
        </div>
      </div>
    </div>
  );
}
