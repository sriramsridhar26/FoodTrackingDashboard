import React from "react";
import './Transitdetails.css';
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import { useState, useEffect } from "react";
import { render } from "react-dom";
import { Grid } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Transitdetails({ transit }) {
    const [transitdetails, settransitdetails] = useState({});
    const [enabletransitdetdiv, settransitdetdiv] = useState(false);
    const [enablecharts, setcharts] = useState(false);
    const [content, setContent] = useState({});
    const [chartdata, setchartdata] = useState({});
    const [piedata, setpiedata] = useState({});
    const [totalweight, settotalweight] = useState(0);
    const [totalst, settotalst] = useState(0);
    const [totalrt, settotalrt] = useState(0);
    const [tabledata, settabledata] = useState({});
    var totalsent = 0;
    var totalrecieved = 0;

    var dateArray = [];
    for (var i = 0; i < 5; i++) {  // TODO: hardcoded 5 date values here, need to make it adaptive
        var date = new Date();
        date.setDate(date.getDate() - 10);
        dateArray.push(date.toISOString().split('T')[0]);
    }


    useEffect(() => {
        // console.log(transit);
        settransitdetdiv(false);

        axios.get("http://165.227.37.57:8000/getTransitLevelInfo?transitID=" + transit)
            .then(response => {
                // Clear variables
                settotalweight(0);
                totalsent = 0;
                totalrecieved = 0;
                settotalst(0);
                settotalrt(0);
                settransitdetails(response.data);
                // console.log("api call success in Transitdetails");
                setContent(response.data.content);

                // Set Donut data   // TODO: hardcoded 5 colors here, need to make it adaptive
                setchartdata({
                    datasets: [{
                        data: content.Total_Qty_sent,
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)',
                            'rgb(203, 57, 45)',
                            'rgb(30, 136, 61)'
                        ],
                        hoverOffset: 4,
                        borderWidth: 0
                    }],
                    labels: content.Fruit_name,
                    options: {
                        plugins: {
                            legend: {
                                position: 'right'
                            }
                        }
                    }
                });

                // console.log(content.Total_Qty_sent);
                content.Total_Qty_sent.forEach((element) => {
                    totalsent = totalsent + element;
                });
                settotalweight(totalsent);


                content.Total_Qty_Received.forEach((element) => {
                    // settotalweight(totalweight+element);
                    totalrecieved = totalrecieved + element;
                    console.log("totalrecieved: , element",totalrecieved,element);
                });
                // console.log("totalsent: ",totalsent );
                
                settotalst(totalsent);
                settotalrt(totalrecieved);

                // Set Pie data
                setpiedata({
                    datasets: [{
                        data: [totalsent, totalrecieved],
                        backgroundColor: [
                            'rgb(72, 173, 202)',
                            'rgb(146, 82, 232)',
                        ],
                        hoverOffset: 4,
                        borderWidth: 0
                    }],
                    labels: ["Total Qty Sent", "Total Qty Recieved"],
                    options: {
                        plugins: {
                            legend: {
                                position: 'right'
                            }
                        }
                    }
                });

                // Set Table data
                settabledata(
                    {
                        "Fruits": content.Fruit_name,
                        "Spoiled": content.Spoiled,
                        "Packaged date": dateArray
                    }
                );

                settransitdetdiv(true);
            })
            .catch(error => {
                console.error(error);
            })
    }, [transit]);

    useEffect(() => {
        if (enabletransitdetdiv) {
            // console.log(content.Spoiled);


        }

        // settransitdetdiv(false);
    }, [enabletransitdetdiv])
    const columns = Object.keys(tabledata);
    return (
        <>

            {enabletransitdetdiv &&
                <div>
                    {/* <h3>{transit}</h3> */}
                    <div className="dummyintransdet"></div>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <div className="donut">
                                <div className="totals">
                                    <h2>{totalweight} kg</h2>
                                    <p>Payload</p>
                                </div>
                                <Doughnut data={chartdata} />
                            </div>

                        </Grid>
                        <Grid item xs={6}>
                            <div className="pie">
                                <div className="totals">
                                    <h2>{totalst} / {totalrt} kgs </h2>
                                    <p>Total Sent and Recieved</p>
                                </div>
                                <Pie data={piedata} />
                            </div>

                        </Grid>
                    </Grid>
                    <div className="table">
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell key={column}><p>{column}</p></TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {tabledata[columns[0]].map((_, i) => (
                                        <TableRow key={i}>
                                            {columns.map((column) => (
                                                <TableCell key={column}>
                                                    <Link to={`/TransitFruit/${content.Fruit_Id[i]}/${transit}`}>
                                                        {tabledata[column][i]}
                                                    </Link>
                                                    {/* {tabledata[column][i]} 
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))} */}
                                    {tabledata[columns[0]].map((_, i) => (
                                        <TableRow key={i}>
                                            {columns.map((column, columnIndex) => (
                                                <TableCell key={column}>
                                                    {columnIndex === 0 ? (
                                                        <Link to={`/TransitFruit/${content.Fruit_Id[i]}/${transit}`}>
                                                            {tabledata[column][i]}
                                                        </Link>
                                                    ) : (
                                                        tabledata[column][i]
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                    <div className="span">

                    </div>
                </div>}

        </>
    )
}