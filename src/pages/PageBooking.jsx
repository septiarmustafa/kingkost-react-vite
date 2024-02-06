import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import NavBooking from '../components/Booking/NavBooking';
import Booking from '../components/Booking/Booking';

function PageBooking() {

  return (
      <div>
        <NavBooking />
        <Booking/>
        <Footer />
      </div>
  );
}

export default PageBooking;
