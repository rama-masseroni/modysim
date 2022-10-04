import { useFormik } from "formik";
import "./App.css";
import Header from "./Header";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Slider, TextField } from "@mui/material";

const ParameterSchema = Yup.object().shape({
  equation: Yup.string(
    "Enter an equation. Make sure to use special symbols such as ^"
  ).required(),

  a: Yup.number("Enter the a value for the A matrix").integer().min(-5).max(5),
  b: Yup.number("Enter the b value for the A matrix").integer().min(-5).max(5),
  c: Yup.number("Enter the c value for the A matrix").integer().min(-5).max(5),
  d: Yup.number("Enter the d value for the A matrix").integer().min(-5).max(5),

  // Autovectores 1 y 2; en principio serían arrays de 2 espacios
});

export default function App() {
  const [eigenvalue_1, setEV1] = useState([0, 0]);
  const [eigenvalue_2, setEV2] = useState([0, 0]);

  // useEffect(() => {
  //   console.log('Autovector 1: ' + eigenvalue_1);
  //   console.log('Autovector 2: ' + eigenvalue_2);
  // }, []);

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
              fullWidth
              id="equation"
              name="equation"
              label="Equation"
              value={formik.values.equation}
              onChange={formik.handleChange}
              error={formik.touched.equation && Boolean(formik.errors.equation)}
              helperText={formik.touched.equation && formik.errors.equation}
            />

            <Slider
              fullWidth
              id="a"
              name="a"
              label="a value"
              value={formik.values.a}
              onChange={formik.handleChange}
              error={formik.touched.a && Boolean(formik.errors.a)}
              helperText={formik.touched.a && formik.errors.a}
            />

            <Slider
              fullWidth
              id="b"
              name="b"
              label="b value"
              value={formik.values.b}
              onChange={formik.handleChange}
              error={formik.touched.b && Boolean(formik.errors.b)}
              helperText={formik.touched.b && formik.errors.b}
            />

            <Slider
              fullWidth
              id="c"
              name="c"
              label="c value"
              value={formik.values.c}
              onChange={formik.handleChange}
              error={formik.touched.c && Boolean(formik.errors.c)}
              helperText={formik.touched.c && formik.errors.c}
            />

            <Slider
              fullWidth
              id="d"
              name="d"
              label="d value"
              value={formik.values.d}
              onChange={formik.handleChange}
              error={formik.touched.d && Boolean(formik.errors.d)}
              helperText={formik.touched.d && formik.errors.d}
            />
          </form>
        </div>
        <div className="display">
          <h2>test display</h2>
        </div>
      </div>
    </div>
  );
}
