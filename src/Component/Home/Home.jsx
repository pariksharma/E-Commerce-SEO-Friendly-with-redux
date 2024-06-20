import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import AppProducts from '../Products/Products';
import { Helmet } from 'react-helmet'; 
import ButtonForTop from '../../Containers/ButtonForTop/ButtonForTop'; 
import { backgroundImage } from '../../assets/imageUrl';

function AppHome() {
    const [scrollUp, setScrollUp] = useState(false);

    // useEffect hook to add a scroll event listener
    useEffect(() => {
        const handleScroll = () => {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                setScrollUp(true);
            } else {
                setScrollUp(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Function to scroll to the top of the page
    const goTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0; 
    };

    return (
        <div className='hero'>
            {/* Helmet to manage document head For Google Indexing in Future */}
            <Helmet>
                <title>IndoTrend</title>
                <meta name='description' content='Get your all Outfit on IndoTrend Shop' />
                <meta name='keywords' content="Jewelery, Electronic, men's clothing, women's clothing" />
                <style type='text/css'>
                    {`
                        .hero {
                            background-color: white;
                        }
                    `}
                </style>
            </Helmet>

            {/* Card component with background image and overlay */}
            <Card className="bg-white text-white border-0">
                <Card.Img src={backgroundImage} height="550px" alt="Card image" />
                <Card.ImgOverlay className='d-flex justify-content-end'>
                    <div className="container d-flex flex-column justify-content-center align-items-end text-black">
                        <Card.Title className='display-3 fw-bolder mb-0'>New Season Arrival</Card.Title>
                        <Card.Text className='lead fs-2'>CHECK OUT ALL NEW TRENDS</Card.Text>
                    </div>
                </Card.ImgOverlay>
            </Card>

            <AppProducts />

            {/* Conditional rendering of scroll-to-top button */}
            {scrollUp && <ButtonForTop GoTop={goTop} />}
        </div>
    );
}

export default AppHome; 
