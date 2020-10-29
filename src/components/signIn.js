import React, { useState } from "react";
import useSignInForm from "../utils/customHook";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import { userLoginDetails } from "../utils/constants";
import { setUserData } from "../utils/utils";

const SignIn = (props) => {
  const [error, setError] = useState(false);

  const signIn = () => {
    const userObj = userLoginDetails.find((ele) => {
      return (
        ele.username === inputs.userName && ele.password === inputs.password
      );
    });
    if (userObj !== undefined) {
      localStorage.setItem("loggedInUserEmail", userObj.username);
      setUserData();
      props.onLogin();
    } else {
      setError(true);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useSignInForm(
    { userName: "", password: "" },
    signIn
  );

  return (
    <div className="home-page-block">
      <div className="home-page-inner-block">
        <Box pt={10}>
          <Container maxWidth="lg">
            <Grid container justify="center">
              <Grid item>
                <Paper style={{ padding: "20px" }}>
                  <AppBar
                    position="static"
                    style={{ padding: "10px", alignItems: "center" }}
                  >
                    <Typography> Sign In </Typography>
                  </AppBar>
                  <div data-testid="signIn">
                    <form onSubmit={handleSubmit}>
                      <div className="form-element">
                        <TextField
                          type="text"
                          name="userName"
                          label="Username"
                          onChange={handleInputChange}
                          value={inputs.userName}
                          required
                          inputProps={{
                            "data-testid": "username-text",
                          }}
                        />
                      </div>
                      <div className="form-element">
                        <TextField
                          type="password"
                          name="password"
                          label="Password"
                          onChange={handleInputChange}
                          value={inputs.password}
                          required
                          inputProps={{
                            "data-testid": "password-text",
                          }}
                        />
                      </div>
                      <div
                        className="form-element"
                        style={{ display: "flex", justifyContent: "center" }}
                        data-testid="signinbtn"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          data-testid="signInBtn"
                        >
                          Sign In
                        </Button>
                      </div>
                      {error ? (
                        <Typography data-testid="errorMsg" color="error">
                          Incorrect credentials provided
                        </Typography>
                      ) : (
                        ""
                      )}
                    </form>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>
      <blockquote>
        <span>
          Photo by{" "}
          <a href="https://unsplash.com/@brett_jordan?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Brett Jordan
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/s/photos/email?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Unsplash
          </a>
        </span>
      </blockquote>
    </div>
  );
};

export default SignIn;
