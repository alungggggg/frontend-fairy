import Footer from "../template/footer";
import Header from "../template/header";

const KebijakanPrivasiPage = () => {
  return (
    <section>
      <Header />
      <section style={{ minHeight: "calc(100vh - 80px)" }}>
        <div className="py-5" style={{ backgroundColor: "gray" }}>
          <div className="container text-white">
            <h1>Kebijakan Privasi</h1>
            <p className="fs-6 fw-light">
              oleh srikandikreatifnusantara / <span>Juni 27, 2025</span>
            </p>
          </div>
        </div>
        <div className="container py-5">
          <p className="fs-6">
            Selamat datang di situs Panji Kediri (selanjutnya disebut “Kami”).
            Privasi Anda adalah hal yang sangat penting bagi kami. Kebijakan
            Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan,
            menyimpan, dan melindungi data pribadi pengguna saat mengakses dan
            menggunakan layanan kami di situs web ini.
          </p>
          <h5>1. Informasi yang Kami Kumpulkan</h5>
          <p>
            Kami dapat mengumpulkan informasi pribadi dari pengguna dengan
            berbagai cara, termasuk namun tidak terbatas pada:
          </p>
          <ul className="list-group list-group-numbered mb-4">
            <li className="list-group-item">
              Informasi akun: Nama, alamat email, dan data saat mendaftar.
            </li>
            <li className="list-group-item">
              Riwayat dongeng yang dibaca dan skor kuis pengguna.
            </li>
            <li className="list-group-item">
              Data teknis: IP address, jenis perangkat, browser, dan aktivitas
              log.
            </li>
          </ul>

          <h5>2. Penggunaan Informasi</h5>
          <p>Informasi digunakan untuk:</p>
          <ul className="list-group list-group-numbered mb-4">
            <li className="list-group-item">
              Menyediakan akses ke konten dongeng dan fitur seperti AR dan kuis.
            </li>
            <li className="list-group-item">
              Mengembangkan dan meningkatkan fitur situs.
            </li>
            <li className="list-group-item">
              Mengirimkan notifikasi terkait pembaruan konten dan fitur.
            </li>
          </ul>

          <h5>3. Penyimpanan dan Keamanan Data</h5>
          <p>
            Kami menyimpan data pengguna dengan aman dan tidak membagikannya ke
            pihak ketiga tanpa izin, kecuali diwajibkan oleh hukum.
          </p>

          <h5>4. Penggunaan Teknologi AR</h5>
          <p>
            Fitur AR pada PDF mungkin meminta akses ke kamera. Akses ini hanya
            digunakan untuk menampilkan konten interaktif dan tidak merekam atau
            menyimpan data tanpa izin.
          </p>

          <h5>5. Kuis Dongeng</h5>
          <p>
            Hasil kuis disimpan secara anonim untuk kepentingan edukasi dan
            analisis. Tidak ada data pribadi yang dibagikan tanpa persetujuan.
          </p>

          <h5>6. Hak Pengguna</h5>
          <p>Anda memiliki hak untuk :</p>
          <ul className="list-group list-group-numbered mb-4">
            <li className="list-group-item">
              Mengakses, memperbarui, atau menghapus informasi pribadi.
            </li>
            <li className="list-group-item">
              Menolak pengumpulan data tertentu (dengan konsekuensi pada fitur).
            </li>
            <li className="list-group-item">
              Menghubungi kami untuk pertanyaan atau permintaan data.
            </li>
          </ul>

          <h5>7. Perubahan Kebijakan</h5>
          <p>
            Kami dapat memperbarui kebijakan ini secara berkala. Pengguna akan
            diberi notifikasi jika ada perubahan signifikan.
          </p>

          <h5>8. Kontak</h5>
          <p>
            Jika Anda memiliki pertanyaan terkait kebijakan ini, hubungi kami
            di:{" "}
            <a href="mailto:encil@unpkediri.ac.id" className="text-blue-500">
              encil@unpkediri.ac.id
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default KebijakanPrivasiPage;
