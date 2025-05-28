import { Link } from "react-router-dom";

const BannerEdubaca = () => {
  return (
    <section className="d-flex align-items-center justify-content-md-center" style={{ paddingTop: '76px' }}>
      <div className="w-100 px-3">
        <h1 className="fw-bold" style={{fontSize:"42px"}}>Selamat Datang di EduBaca!</h1>
        <p className="fs-6 fw-light my-3">
          Tingkatkan kemampuan membaca kritis dan pemahaman bacaanmu lewat
          berbagai teks menarik dan latihan interaktif.
        </p>
        <Link to={"./bacaan"} className="btn text-white fw-semibold mt-4 px-4 py-2" style={{backgroundColor : "#A0C878"}}>Mulai Belajar</Link>
      </div>
      <div className="w-100 d-md-flex justify-content-center d-none">
        <img
          src="eduBanner.png"
          alt="Banner EduBaca"
          className="img-fluid mt-4"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
    </section>
  );
};
export default BannerEdubaca;
