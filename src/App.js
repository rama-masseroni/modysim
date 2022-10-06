import { useFormik } from "formik";
import "./App.css";
import Header from "./Header";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Button, Slider, TextField } from "@mui/material";
import marks from './marks';

const ParameterSchema = Yup.object().shape({
  equation: Yup.string(
    "Enter an equation. Make sure to use special symbols such as ^"
  ).required("Este parámetro es obligatorio!"),

  a: Yup.number("Enter the a value for the A matrix").required("Este parámetro es obligatorio!"),
  b: Yup.number("Enter the b value for the A matrix"),
  c: Yup.number("Enter the c value for the A matrix").required("Este parámetro es obligatorio!"),
  d: Yup.number("Enter the d value for the A matrix"),

  // Autovectores 1 y 2; en principio serían arrays de 2 espacios
});


export default function App() {
  const [eigenvalue_1, setEV1] = useState([0, 0]);
  const [eigenvalue_2, setEV2] = useState([0, 0]);

  // useEffect(() => {
  //   console.log('Autovector 1: ' + eigenvalue_1);
  //   console.log('Autovector 2: ' + eigenvalue_2);
  // }, []);

  function valueText(value) {
    return `${value}°C`;
  }

  const formik = useFormik({
    initialValues: {
      equation: "",

      a: 0,
      b: 0,
      c: 0,
      d: 0,
    },
    validationSchema: ParameterSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="App">
      <Header />
      <div className="body">
        <div className="inputs">
          <h2>test inputs</h2>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              color="secondary"
              sx={{
                backgroundColor: "white",
                border: "1px solid #ced4da",
                borderRadius: 1,
              }}
              id="equation"
              name="equation"
              label="Equation"
              value={formik.values.equation}
              onChange={formik.handleChange}
              error={formik.touched.equation && Boolean(formik.errors.equation)}
              helperText={formik.touched.equation && formik.errors.equation}
            />
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
              onSubmit={formik.handleSubmit}
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
