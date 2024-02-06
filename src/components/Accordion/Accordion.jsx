import React from 'react';
import './Style.css'; // Pastikan untuk mengimpor gaya kustom Anda

function Accordion() {
  return (
    <div className="row py-5" style={{ marginTop: '5em', marginBottom: '5em' }}>
      <div className="col-sm-6 px-5 wow fadeInUp" data-wow-delay="0.1s">
        <h1 className="text-24-bold ps-5" style={{ color: 'black' }}>
          Frequently Asked Question
        </h1>
        <p className="text-16-light ps-5" style={{ color: 'black' }}>
          Beberapa pertanyaan yang sering diajukan tentang pemesanan booking Kingkos...
        </p>
      </div>

      <div className="col-sm-6 pe-5">
        <div className="accordion wow fadeInUp" data-wow-delay="0.1s" id="accordionPanelsStayOpenExample">
          <div className="accordion-item ">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
                style={{ background: '#0db5af', color: 'white' }}
              >
                Bagaimana cara melakukan pemesanan kosan di Kingkos?
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
            >
              <div className="accordion-body">
                Untuk memesan kosan di Kingkos, Anda dapat mengikuti langkah-langkah berikut: [Tambahkan instruksi atau informasi khusus mengenai pemesanan].
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
                style={{ background: '#0db5af', color: 'white' }}
              >
                Berapa biaya yang diperlukan untuk memesan kosan di Kingkos?
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              className="accordion-collapse collapse"
            >
              <div className="accordion-body">
                Biaya pemesanan kosan di Kingkos dapat bervariasi. Silakan cek halaman produk atau hubungi kami untuk mendapatkan informasi lebih lanjut tentang biaya dan persyaratan pembayaran.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseThree"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseThree"
                style={{ background: '#0db5af', color: 'white' }}
              >
                Apakah saya dapat membatalkan pemesanan kosan setelah melakukan pembayaran?
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseThree"
              className="accordion-collapse collapse"
            >
              <div className="accordion-body">
                Kebijakan pembatalan dapat bervariasi. Harap membaca syarat dan ketentuan kami atau menghubungi layanan pelanggan untuk informasi lebih lanjut mengenai kebijakan pembatalan pemesanan kosan di Kingkos.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
