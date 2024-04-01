
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import './TransitnFruitn.css';
import { Grid } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect } from "react";
import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



export const options1 = {
    responsive: true,
    plugins: {

        title: {
            display: true,
            text: 'CO2 vs Time',
        },
    },
};
export const options2 = {
    responsive: true,
    plugins: {

        title: {
            display: true,
            text: 'Humidity vs Time',
        },
    },
};

export const options3 = {
    responsive: true,
    plugins: {

        title: {
            display: true,
            text: 'Temperature vs Time',
        },
    },
};
function TransitnFruitn({ onupdateSideNav }) {
    onupdateSideNav(true);
    const [co2graphdata, setco2graphdata] = useState({});
    const [humgraphdata, sethumgraphdata] = useState({});
    const [tempgraphdata, settempgraphdata] = useState({});
    const [enablediv, setenablediv] = useState(false);
    const [content, setContent] = useState({});
    const [specificContent, setspecificContent] = useState({});

    var params = useParams();
    console.log(params);
    let datetimeArray = [];
    let co2Array = [];
    let tempArray = [];
    let humidityArray = [];

    useEffect(() => {
        axios.get("http://165.227.37.57:8000/getTransitData?fruitId=" + params.FruitId + "&transitID=" + params.transitId)
            .then(response => {
                // ChartJS.helpers.each(Chart.instances, function (instance) {
                //     instance.destroy();
                //   }); 
                let contentArray = response.data.content; // Change this line
                setContent(response.data.content);
                for (let content of contentArray) {
                    for (let datetime in content.Transit_logs) {
                        datetimeArray.push(datetime);
                        co2Array.push(content.Transit_logs[datetime].CO2);
                        tempArray.push(content.Transit_logs[datetime].Temp);
                        humidityArray.push(content.Transit_logs[datetime].Humidity);
                    }
                }
                setspecificContent({
                    Start: contentArray[0].Start,
                    Destination: contentArray[0].Destination,
                    Total_Qty_Sent: contentArray[0].Total_Qty_Sent,
                    Total_Qty_Received: contentArray[0].Total_Qty_Received,
                    Spoiled: contentArray[0].Spoiled,
                    Loss_Percent: contentArray[0].Loss_Percent,
                    Fruit_name: contentArray[0].Fruit_name,
                })

                // console.log(datetimeArray);
                // console.log(co2Array);
                // console.log(tempArray);
                // console.log(humidityArray);
                setco2graphdata({
                    labels: datetimeArray,
                    datasets: [
                        {
                            label: 'CO2',
                            data: co2Array,
                            borderColor: 'rgb(33, 157, 226)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        }
                    ]
                })
                sethumgraphdata({
                    labels: datetimeArray,
                    datasets: [
                        {
                            label: 'Humidity',
                            data: humidityArray,
                            borderColor: 'rgb(203, 191, 58)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        }
                    ]
                })
                settempgraphdata({
                    labels: datetimeArray,
                    datasets: [
                        {
                            label: 'Temp',
                            data: tempArray,
                            borderColor: 'rgb(119, 25, 170)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        }
                    ]
                })
                setenablediv(true);



            })
            .catch(error => {
                console.error(error);
            })


    }, []);
    useEffect(() => {
        console.log(specificContent);
    }, [enablediv]);



    return (
        <>
            {enablediv &&
                <div className="transitnfruitsn">
                    <h3>Statistics of {specificContent.Fruit_name} travelling from {specificContent.Start}</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <div className="graphdiv">
                                <Line options={options1} data={co2graphdata} />
                            </div>

                        </Grid>
                        <Grid item xs={4}>
                            <div className="table">
                                <h3>Key Info</h3>
                                <TableContainer component={Paper}>
                                    <Table sx={{
                                        '& .MuiTableCell-sizeMedium': {
                                            padding: '8px',
                                        },
                                    }}>
                                        <TableBody>
                                            {Object.keys(specificContent).map((key) => (
                                                <TableRow key={key}>
                                                    <TableCell >{key}</TableCell>
                                                    <TableCell >{specificContent[key]}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <div className="graphdiv">
                                <Line options={options2} data={humgraphdata} />
                            </div>

                        </Grid>
                        <Grid item xs={6}>
                            <div className="graphdiv">
                                <Line options={options3} data={tempgraphdata} />
                            </div>
                        </Grid>

                    </Grid>

                </div>}



        </>
    )
}

export default TransitnFruitn;