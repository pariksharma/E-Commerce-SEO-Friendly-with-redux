import React from 'react';
import { Helmet } from 'react-helmet';

function AppAbout() {
  return (<>
      <Helmet>
        <title>About IndoTrend</title>
        <meta name='description' content='Discover the heart and soul behind IndoTrends. From our humble beginnings to our vision for the future, delve into our story and ethos.' />
      </Helmet>
      <div className='px-4 my-5 bg-white rounded-3 py-3'>
        <div className='container py-4'>
            <h1 className='text-danger py-4'>This is About Page</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ex explicabo assumenda dolorum aperiam maxime id expedita pariatur eius rem veritatis molestias quam, illo omnis velit architecto corporis necessitatibus temporibus.</p>
        </div>
      </div>
    </>
  )
}

export default AppAbout