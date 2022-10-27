import { Box, TextField, Button } from "@mui/material";

//import useFormik to use formik in form 
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserNameForm = () => {
  const nagivate = useNavigate();
  const [userName, setUserName] = useState(false);
  

  //check validation for form (Formik)
  const validate = (valuesCurrent: any) => {
    const errors = {
      userName: "",
    };
    if (!valuesCurrent.userName.trim()) {
      errors.userName = "required Name";

      setUserName(false);
    } else if (valuesCurrent.userName.trim().length < 3) {
      errors.userName = "Name must more than 3 characters";
      setUserName(false);
    } else {
      setUserName(true);
    }
    return errors;
  };


  //Function to Submit form 
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (userName) {
      localStorage.setItem("userName", formik.values.userName);
      localStorage.setItem("statusProgress", "Progress");
      nagivate('/exam')
    }
  };

  //use useFormik
  const formik = useFormik({
    initialValues: {
      userName: "",
    },
    validate,
    onSubmit: handleSubmit,
  });

  //use keypress from keyboard
  const onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  return (
    <Box
      component="form"
      autoComplete="off"
      sx={{
    
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <TextField
        id="userName"
        label="Enter Your Name"
        value={formik.values.userName}
        onChange={formik.handleChange}
        error={formik.touched.userName}
        onKeyPress={onKeyPress}
        onBlur={formik.handleBlur}
        helperText={formik.errors.userName}
        required
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ backgroundColor: "#FF7332", margin: "20px" ,"&:hover":{
          backgroundColor:"#FF8F5B"
        }}}
      >
        Submit
      </Button>
    </Box>
  );
};

export default UserNameForm;
