import './DashboardCard.css';
import truckimg from '../../assets/truck.png';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Transitn from '../../pages/Transitn/Transitn';


function DashboardCard({ CardDeets }) {
    const navigate = useNavigate();
    function navtransit(){
        // console.log("transit id in home ",CardDeets.Transit_Id);
        // navigate(Transitn,CardDeets.Transit_Id) ${CardDeets.Transit_Id}
        navigate(`/Transit/${CardDeets.Transit_Id}`);
    }
    console.log(CardDeets);

    return (
        <>
            <div className='card'>
                {/* <h1>Hello World</h1> */}
                <img src={truckimg} />
                <Grid container sx={{ "margin-top": "2%" }}>
                    <Grid item xs={8}>
                        <h3 className='cardheading'>Shipment: {CardDeets.Transit_Id}</h3>
                        <p className='cardsubheading'>From {CardDeets.Start}</p>
                    </Grid>
                    <Grid item xs={4} >
                        {/* <p>button</p> */}
                        <div class="round-button" onClick={navtransit}>
                            &gt;
                        </div>
                    </Grid>
                </Grid>




            </div>
        </>
    )

}

export default DashboardCard;