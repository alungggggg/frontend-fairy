const dummySoal = [
  {
    id: 1,
    soal: "Apa itu React?",
    jawaban: [
      { id: 1, text: "Library JavaScript untuk membangun antarmuka pengguna" },
      { id: 2, text: "Framework CSS" },
      { id: 3, text: "Database NoSQL" },
      { id: 4, text: "Bahasa pemrograman" },
    ],
    jawaban_benar: 1,
  },

  {
    id: 2,
    soal: "Apa itu Redux?",
    jawaban: [
      { id: 1, text: "Library untuk manajemen state di React" },
      { id: 2, text: "Framework CSS" },
      { id: 3, text: "Database SQL" },
      { id: 4, text: "Bahasa pemrograman" },
    ],
    jawaban_benar: 1,
  },

  {
    id: 3,
    soal: "Apa itu JSX?",
    jawaban: [
      {
        id: 1,
        text: "Sintaks yang digunakan di React untuk mendeskripsikan UI",
      },
      { id: 2, text: "Framework CSS" },
      { id: 3, text: "Database SQL" },
      { id: 4, text: "Bahasa pemrograman" },
    ],
    jawaban_benar: 1,
  },
  {
    id: 4,
    soal: "Apa itu Virtual DOM?",
    jawaban: [
      {
        id: 1,
        text: "Representasi virtual dari DOM yang digunakan oleh React",
      },
      { id: 2, text: "Framework CSS" },
      { id: 3, text: "Database SQL" },
      { id: 4, text: "Bahasa pemrograman" },
    ],
  },
];

const DebatViewArtikel = ({ artikelData }) => {
  return (
    <section>
      <div
        className="d-flex flex-column align-items-center justify-content-center position-relative"
        style={{ minHeight: "calc(85vh)", backgroundColor: "#F8F9FA" }}
      >
        <iframe
          src={artikelData?.artikel_link}
          width="100%"
          style={{ minHeight: "calc(85vh)" }}
        ></iframe>
      </div>

      <div>
        {dummySoal?.map((item, index) => (
          <div key={index} className="card my-3">
            <div className="card-body">
              <h5 className="card-title">{item.soal}</h5>
              <ul className="list-group list-group-flush">
                <li>A {item.jawaban[0].text}</li>
                <li>B {item.jawaban[1].text}</li>
                <li>C {item.jawaban[2].text}</li>
                <li>D {item.jawaban[3].text}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DebatViewArtikel;
