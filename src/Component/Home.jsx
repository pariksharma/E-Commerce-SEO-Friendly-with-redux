import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import AppProducts from './Products';
import { Button } from 'react-bootstrap';

const backgroundImage = "https://media.istockphoto.com/id/1187797218/photo/guy-making-loud-announcement-at-copy-space-on-yellow-background.webp?b=1&s=170667a&w=0&k=20&c=Fs6UqR84lxqI-tAUXKol7mKKtI8xt7-oezMO2t-2JNI=";


function AppHome() {
    

    const [scrollUp, setscrollUp] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
                setscrollUp(true);
            }
            else{
                setscrollUp(false)
            }
        })
    }, [])

    const GoTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    const ButtonForTop = () => {
        return (<>
            <div className='' style={{position: 'absolute',right:'100px', bottom: '100px'}} onClick={GoTop}>
                <button className='btn btn-outline-dark rounded-circle py-2' style={{position: 'fixed'}} >
                    <i className='fa fa-chevron-up'></i>
                </button>
            </div>
        </>)
    }
  return (
    <div className='hero'>
        <Card className="bg-white text-white border-0">
            <Card.Img src={backgroundImage} height="550px" alt="Card image" />
            <Card.ImgOverlay className='d-flex justify-content-end'>
                <div className="container" style={{display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "end",
                    color: 'black'}}>
                    <Card.Title className='display-3 fw-bolder mb-0'>New Season Arrival</Card.Title>
                    <Card.Text className='lead fs-2'>
                        CHECK OUT ALL NEW TRENDS
                    </Card.Text>
                </div>
                
            </Card.ImgOverlay>
        </Card>
        <AppProducts />
        {scrollUp ? <ButtonForTop /> : ""}
    </div>
  )
}

export default AppHome