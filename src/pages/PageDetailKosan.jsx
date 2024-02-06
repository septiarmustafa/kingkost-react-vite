import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import DetailKosan from '../components/Kosan/DetailKosan';
import NavDetailKosan from '../components/Kosan/NavDetailKosan';

function PageDetailKosan() {
  const { id } = useParams(); // Mendapatkan ID dari URL

  return (
      <div>
        <NavDetailKosan />
        <DetailKosan id={id} />
        <Footer />
      </div>
  );
}

export default PageDetailKosan;
