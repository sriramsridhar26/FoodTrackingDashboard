import React from "react";
import './TransitCard.css';
import { Grid, Icon } from "@mui/material";
import truck from '../../assets/truck.png';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';

function TransitCard({ transit }) {


    return (

        <>
            <div className="transitcards">
                {/* <h1>
                    Hello world
                </h1> */}
                <div className="shipment">
                    <Grid container>
                        <Grid item xs={7}>
                            <div className="shipmentdeets">
                                <p>Shipment Number</p>
                                <h3>{transit.Transit_Id}</h3>
                                <p>Food materials</p>
                            </div>

                        </Grid>
                        <Grid item xs={5}>
                            <div className="truckimg">
                                <img src={truck} width="160px" height="75px" />
                            </div>

                        </Grid>
                    </Grid>
                </div>
                <div className="navigation">
                    {/* <Grid container>
                        <Grid item xs={8}> */}
                    <div className="navdeets">
                        <p>From</p>
                        <h4>{transit.Start}</h4>
                        <p>To</p>
                        <h4>{transit.Destination}</h4>
                    </div>
                    {/* </Grid>
                        <Grid item xs={4}>

                        </Grid>
                    </Grid> */}

                </div>
                {/* <div className="client">
                    <Grid container>
                        <Grid item xs={2}>
                            <h3>img</h3>
                        </Grid>
                        <Grid item xs={6}>
                            <p>Client</p>
                            <h3>Jerry</h3>
                            <h5>Company</h5>

                        </Grid>
                        <Grid item xs={2}>
                            <div className="icon">
                                <LocalPhoneOutlinedIcon sx={{ color: 'rgb(89, 50, 234)' }} />
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div className="icon">
                                <MessageOutlinedIcon sx={{ color: 'rgb(89, 50, 234)' }} />
                            </div>
                        </Grid>
                    </Grid>

                </div> */}

            </div>
        </>
    )

}

export default TransitCard;