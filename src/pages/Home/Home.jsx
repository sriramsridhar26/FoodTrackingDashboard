import DashboardCard from '../../components/DashboardCard/DashboardCard';
import React, { useEffect, useState } from 'react';
import { fetchtransitdata } from '../../data/mockuphome';
import './Home.css';
import map from "lodash/map";
// import transitdata from "../../data/mockuphome";
import range from "lodash/range";
import axios from 'axios';
// import { Carousel } from 'react-responsive-carousel';
import { CCarousel, CCarouselCaption,CCarouselItem } from '@coreui/react';
// import { CCarouselCaption } from '@coreui/react';
import { CImage } from '@coreui/react';
import one from "../../assets/carousel/1.png";
import two from "../../assets/carousel/2.png";
import three from "../../assets/carousel/3.png";


function Home({ onupdateSideNav }) {
    onupdateSideNav(true);
    // var transitlist = fetchtransitdata();
    const [transitlist, settransitlist] = useState({});
    const [enabletransitdiv, settransitdiv] = useState(false);
    useEffect(() => {
        axios.get("http://165.227.37.57:8000/getTransits")
            .then(response => {
                settransitlist(response.data);
                console.log("api call success in home");
                settransitdiv(true);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);
    // console.log(transitlist);

    return (
        <>
            {/* <SideNav /> */}
            {/* <CCarousel controls indicators>
                <CCarouselItem>
                    <CImage className="d-block w-100" src={one} alt="slide 1" />
                    <CCarouselCaption className="d-none d-md-block">
                        <h5>First slide label</h5>
                        <p>Some representative placeholder content for the first slide.</p>
                    </CCarouselCaption>
                </CCarouselItem>
                <CCarouselItem>
                    <CImage className="d-block w-100" src={two} alt="slide 2" />
                    <CCarouselCaption className="d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the first slide.</p>
                    </CCarouselCaption>
                </CCarouselItem>
                <CCarouselItem>
                    <CImage className="d-block w-100" src={three} alt="slide 3" />
                    <CCarouselCaption className="d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>Some representative placeholder content for the first slide.</p>
                    </CCarouselCaption>
                </CCarouselItem>
            </CCarousel> */}

            {/* <h2 className='welcome'>Welcome</h2> */}
            <h3 className='welcome'>Transits</h3>
            <div className='CardsView'>
                {enabletransitdiv && transitlist.content.map((item) => (
                    <DashboardCard CardDeets={item} />
                ))}
            </div>
            {/* <h3 className='welcome'>Fruits</h3>
            <div className='CardsView'>
                {enabletransitdiv && transitlist.content.map((item) => (
                    <DashboardCard CardDeets={item} />
                ))}
            </div> */}


            {/* <div className='CardsView'>
                {transitlist.content.map((item) => (
                    <DashboardCard CardDeets={item} />

                ))}
            </div> */}
        </>

    )

}

export default Home;