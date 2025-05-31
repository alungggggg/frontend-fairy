const ActionList = () => {
  return (
    <div className="row row-cols-1 row-cols-md-2 gy-3 gx-3 gy-lg-4 gx-lg-4 mb-4">
      <div className="col">
        <div
          className="card p-3  bg-opacity-50 h-100 shadow"
          style={{ backgroundColor: "#A0C878" }}
        >
          <h1 className="fs-5 fw-semibold">Materi</h1>
        </div>
      </div>
      <div className="col d-flex flex-column d-inline-flex gap-1">
        <button
          className="card p-3 text-start  bg-opacity-50 h-100 shadow"
          style={{ backgroundColor: "#A0C878" }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <h1 className="fs-5 fw-semibold">Latihan Interaktif</h1>
          <br />
          <p className="fs-6 fw-light p-0 m-0">Project Literasi</p>
        </button>
        <div className="collapse" id="collapseExample">
          <div className="card card-body">
            Some placeholder content for the collapse component. This panel is
            hidden by default but revealed when the user activates the relevant
            trigger.
          </div>
        </div>
      </div>
      <div className="col">
        <div
          className="card p-3  bg-opacity-50 h-100 shadow"
          style={{ backgroundColor: "#A0C878" }}
        >
          <h1 className="fs-5 fw-semibold">Bank Bacaan</h1>
        </div>
      </div>
      <div className="col">
        <div
          className="card p-3  bg-opacity-50 h-100 shadow"
          style={{ backgroundColor: "#A0C878" }}
        >
          <h1 className="fs-5 fw-semibold">Untuk Guru</h1>
        </div>
      </div>
      <div className="col">
        <div
          className="card p-3  bg-opacity-50 h-100 shadow"
          style={{ backgroundColor: "#A0C878" }}
        >
          <h1 className="fs-5 fw-semibold">Profil Siswa</h1>
        </div>
      </div>
      <div className="col">
        <div
          className="card p-3  bg-opacity-50 h-100 shadow"
          style={{ backgroundColor: "#A0C878" }}
          f
        >
          <h1 className="fs-5 fw-semibold">Kontak & Bantuan</h1>
        </div>
      </div>
    </div>
  );
};

export default ActionList;
