
import React from "react";
import { useParams } from "react-router-dom";
import map from "lodash/map";
// import transitdata from "../../data/mockuphome";
import range from "lodash/range";
import TransitCard from "../../components/TransitCard/TransitCard";
import { Grid } from "@mui/material";
import './Transit.css'
import { fetchtransitdata } from "../../data/mockuphome";
import { Transitdetails } from "../../components/Transitdetails/Transitdetails";
import { useState, useEffect } from "react";
import axios from "axios";



function Transitn({ onupdateSideNav }) {
    const [selectedValue, setSelectedValue] = useState(null);

    const handleCardClick = (value) => {
        // console.log("handlecardclick: ",value);

        setSelectedValue(value);

    };
    onupdateSideNav(true);
    var params = useParams();
    // var transitlist = fetchtransitdata();
    // console.log(params.transitId);
    // var transitlist = fetchtransitdata();
    const [transitlist, settransitlist] = useState({});
    const [enabletransitdiv, settransitdiv] = useState(false);
    useEffect(() => {
        axios.get("http://165.227.37.57:8000/getTransits")
            .then(response => {
                settransitlist(response.data);
                console.log("api call success in Transitn");
                settransitdiv(true);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);


    return (
        <>

            {/* <h1>Hello from Transitn</h1> */}
            <div className="transitnjsx">
                <Grid container >
                    <Grid item xs={4}>
                        <div className="transitsview">
                            {/* {map(range(10), _ => (
                            <TransitCard />
                        ))} */}
                            {/* <div class="search-container">
                            <form action="/action_page.php">
                                <input type="text" placeholder="Search.." name="search" />
                                    <button type="submit"><i class="fa fa-search"></i></button>
                            </form>
                        </div> */}

                            {enabletransitdiv && transitlist.content.map((item) => (
                                <div className="tohandleonclick" onClick={() => handleCardClick(item.Transit_Id)}>
                                    <TransitCard transit={item} key={item.Transit_Id} />
                                </div>

                            ))}

                        </div>

                    </Grid>
                    <Grid item xs={8}>
                        <div className="transitnstuff">
                            {selectedValue && <Transitdetails transit={selectedValue} />}
                        </div>
                    </Grid>

                </Grid>

            </div>

        </>

    )

}

export default Transitn;