
import { Box, Button, Grid, TextField } from "@mui/material";
import loginimg from "../../assets/auth-v2-login-illustration-light.png"
import React from "react";
import './Login.css'
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

function Login({onupdateSideNav}) {
    onupdateSideNav(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        // TODO: Add code to do validation and authentication
        console.log(data);
        navigate("/home");
    }

    console.log(errors);


    return (
        <div className="login-container">
            <Grid container sx={{
                // maxWidth: '100vw',
                // maxHeight: '100vh'
            }} spacing={0}>
                <Grid item xs={10}
                    className="login-left"
                    sx={{
                        backgroundColor: '#f7f6f9',
                        // maxHeight: '100%',
                        // maxWidth: '80vw',
                        
                    }}>
                    <Grid container spacing={0}>
                        <Grid item xs={2}>
                            <Box sx={{
                                marginLeft:'20%',

                            }}>
                                <h2>ZERO</h2>
                            </Box>
                            
                        </Grid>
                        <Grid item xs={10} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'false'
                        }}>
                            <Box
                            >
                                {/* <h1>left</h1> */}
                                <Box component="img"
                                    src={loginimg}
                                    sx={{
                                        marginRight: '0',
                                        height: 'auto',
                                        width: 'auto',
                                        maxWidth: '69%',
                                        // maxHeight: '100%',
                                        overflow: 'false'

                                    }}
                                />

                            </Box>
                        </Grid>
                    </Grid>




                </Grid>
                <Grid item xs={2}
                    className="login-right"
                    sx={{
                        maxHeight: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1%'
                    }}>
                    {/* <h1>right</h1> */}
                    <div>
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField id="outlined-basic" variant="outlined" label="Email" {...register("Email", { required: true })} />
                            <br />
                            <br />
                            <TextField id="outlined-basic" variant="outlined" label="Password" {...register("Password", { required: true })} />
                            <br />
                            <br />
                            {/* <input type="submit" /> */}
                            <Button variant="contained" type="submit">Login</Button>
                        </form>
                    </div>



                </Grid>

            </Grid>

        </div>


        // <h1>Hello from Login</h1>
    )

}

export default Login;