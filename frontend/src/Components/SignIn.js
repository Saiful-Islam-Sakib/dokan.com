import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            {"2020 - "}
            {new Date().getFullYear()}
            {", "}
            <Link color="inherit" href="#">
                dokan.com
            </Link>
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignIn() {
    const classes = useStyles();
    const history = useHistory(); //for redirection

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorStatus, setErrorStatus] = React.useState(false);
    const [rememberMe, setRememberMe] = React.useState(false);

    const handleSignIn = async (event) => {
        // you have to store data into redux store****************************************************************************************
        event.preventDefault();
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.match(mailformat)) {
            try {
                const res = await fetch(
                    "http://localhost:5000/dokan.com/customer/login",
                    {
                        method: "POST",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({
                            email: email,
                            password: password,
                        }),
                    }
                );
                const data = await res.json();

                console.log(data);
                if (data.msg.email === email || data.msg.phone === email) {
                    if (rememberMe) {
                        localStorage.setItem("login", true);
                    } else {
                        sessionStorage.setItem("login", true);
                    }
                    history.push("/");
                } else {
                    setErrorStatus(true);
                    setPassword("");
                }
            } catch (err) {
                console.log(err);
                setErrorStatus(true);
            }
        } else {
            try {
                const res = await fetch(
                    "http://localhost:5000/dokan.com/customer/login",
                    {
                        method: "POST",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({
                            phone: email,
                            password: password,
                        }),
                    }
                );
                const data = await res.json();

                console.log(data);
                if (data.msg.email === email || data.msg.phone === email) {
                    if (rememberMe) {
                        localStorage.setItem("login", true);
                    } else {
                        sessionStorage.setItem("login", true);
                    }
                    history.push("/");
                } else {
                    setErrorStatus(true);
                    setPassword("");
                }
            } catch (err) {
                console.log(err);
                setErrorStatus(true);
            }
        }
    };

    return (
        <Container
            component="main"
            maxWidth="sm"
            style={{ backgroundColor: "white", borderRadius: 10 }}
        >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        error={errorStatus ? true : false}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        type="email"
                        label="Email / Phone Number"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    <TextField
                        error={errorStatus ? true : false}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        value={password}
                        id="password"
                        value={password}
                        autoComplete="password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value="remember"
                                color="primary"
                                onChange={(event) => {
                                    setRememberMe(event.target.checked);
                                }}
                            />
                        }
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        disabled={
                            email.length > 0 && password.length > 0
                                ? false
                                : true
                        }
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSignIn}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signUp" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
export default SignIn;
