import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import axios from "axios"


const registerSchema = yup.object().shape({
  username: yup.string().required("required"),
  email: yup.string().required("required"),
  password: yup.string().required("required"),
  role: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});




const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";


  const [initialValuesRegister, setValues] = useState({
    username:"",
    email: "",
    password: "",
    role:"",
  });

  const [initialValuesLogin, setValuesLogin] = useState({
    username:"",
    password: "",
  });

  const register = async (onSubmitProps) => {

    const savedUserResponse = await axios.post("http://localhost:8000/server/users",JSON.stringify(initialValuesRegister),{
      headers: {
        "Content-Type": "application/json",
      },
    })
    if(savedUserResponse.data) {
      localStorage.setItem('user',JSON.stringify(savedUserResponse.data))
      navigate("/home")
    }else{
    onSubmitProps.resetForm();
    }

  };

  const login = async (onSubmitProps) => {
    const loggedInResponse = await axios.get(`http://localhost:8000/server/users/${initialValuesLogin.username}`,{
      headers: {
        "Content-Type": "application/json",
      },
    })
    if(initialValuesLogin.password === loggedInResponse.data.password){
      localStorage.setItem('user',JSON.stringify(loggedInResponse.data))
      navigate("/home");
    }else{
      onSubmitProps.resetForm();
    }

  };

  const handleFormSubmit = async ( onSubmitProps) => {
    try{
      if (isLogin)  await login(onSubmitProps);
      if (isRegister) await register(onSubmitProps);
    } catch (e) {
      console.log(e);
    }    
   
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      if (isLogin) {
        setValuesLogin((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      } else {
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      }  
};


  return (
    <Formik
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={isLogin ? initialValuesLogin.username : initialValuesRegister.username}
                name="username"
                error={Boolean(touched.username) && Boolean(errors.username)}
                sx={{ gridColumn: "span 4" }}
              />

            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={isLogin ? initialValuesLogin.password : initialValuesRegister.password}
              name="password"
              sx={{ gridColumn: "span 4" }}
            />
            {isRegister && (
              <>
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
            />
             <Select
                label="role"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role} 
                name="role"
                error={Boolean(touched.role) && Boolean(errors.role)}
                sx={{ gridColumn: "span 4" }}
            >
              <MenuItem value={"ETUDIANT"}>Etudiant</MenuItem>
              <MenuItem value={"ENSEIGNANT"}>Enseignant</MenuItem>
              <MenuItem value={"ADMINISTRATION"}>Administration</MenuItem>
            </Select> 
              </>
            )}
          </Box>

          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
              onClick={handleFormSubmit}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;