import Footer from "../template/footer";
import Header from "../template/header";

const KebijakanPrivasiARPage = () => {
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
            Tanggal Berlaku: 26 Juni 2025 <br />
            Nama Aplikasi: AR Cerita Panji <br />
            Developer: David Rindu Kurniawan <br />
            Privasi Anda adalah hal yang sangat penting bagi kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda ketika Anda menggunakan aplikasi AR Cerita Panji, yang tersedia di Google Play Store.
          </p>
          <h5>1. Informasi yang Kami Kumpulkan</h5>
          <p>Kami dapat mengumpulkan informasi berikut ketika Anda menggunakan Aplikasi:</p>
          
          <h5>Informasi Pribadi</h5>
          <p>
            Kami hanya mengumpulkan informasi pribadi jika secara eksplisit diberikan oleh Anda, misalnya:
          </p>
          <ul className="list-group list-group-numbered mb-4">
            <li className="list-group-item">
              Nama Lengkap
            </li>
            <li className="list-group-item">
              Alamat Email
            </li>
            <li className="list-group-item">
              Nomor Pribadi
            </li>
            <li className="list-group-item">
              Tanggal lahir (jika diperlukan untuk verifikasi usia)
            </li>
          </ul>
          

          <h5>Informasi Non-Pribadi</h5>
          <p>Informasi ini tidak mengidentifikasi Anda secara pribadi dan dapat mencakup:</p>
          
          <ul className="list-group list-group-numbered mb-4">
            <li className="list-group-item">
              Tipe perangkat
            </li>
            <li className="list-group-item">
              Sistem operasi
            </li>
            <li className="list-group-item">
              Bahasa perangkat
            </li>
            <li className="list-group-item">
              Negara dan zona waktu
            </li>
            <li className="list-group-item">
              Statistik penggunaan aplikasi
            </li>
          </ul>

          <h5>Informasi Lokasi</h5>
          <p>Jika Anda memberikan izin, Aplikasi dapat mengakses informasi lokasi Anda (lokasi kasar atau akurat) untuk fitur berbasis lokasi.</p>
          
          <h5>Data Anak-anak</h5>
          <p>Jika aplikasi menargetkan anak-anak di bawah usia 13 tahun: <br />
          Kami tidak secara sengaja mengumpulkan data pribadi dari anak-anak. Jika kami mengetahui bahwa kami telah mengumpulkan data pribadi dari anak di bawah 13 tahun tanpa persetujuan orang tua, kami akan menghapus data tersebut sesegera mungkin.
          </p>
          
          <h5>2. Bagaimana Kami Menggunakan Informasi</h5>
          <p>Informasi yang dikumpulkan akan digunakan untuk
          </p>
          <ul className="list-group list-group-numbered mb-4">
            <li className="list-group-item">
              Menyediakan dan meningkatkan layanan Aplikasi
            </li>
            <li className="list-group-item">
              Memberikan dukungan teknis dan merespon pertanyaan pengguna
            </li>
            <li className="list-group-item">
              Mengirim notifikasi penting dan pembaruan (jika diizinkan)
            </li>
            <li className="list-group-item">
              Memastikan kepatuhan terhadap persyaratan hukum yang berlaku
            </li>
            <li className="list-group-item">
              Menyediakan konten yang disesuaikan berdasarkan preferensi pengguna
            </li>
          </ul>

          <h5>3. Penyimpanan dan Keamanan Data</h5>
          <p>
            Kami menyimpan data pengguna secara aman dan hanya selama diperlukan untuk tujuan penggunaan aplikasi. Kami menggunakan praktik keamanan standar industri untuk melindungi informasi Anda dari akses, perubahan, pengungkapan, atau perusakan yang tidak sah.
          </p>

          <h5>4. Pihak Ketiga</h5>
          <p>
            Kami dapat bekerja sama dengan penyedia layanan pihak ketiga seperti:
          </p>
          <ul className="list-group list-group-numbered mb-4">
            <li className="list-group-item">
              Google Firebase (untuk analytics, crash reporting)
            </li>
            <li className="list-group-item">
              AdMob (untuk menayangkan iklan)
            </li>
            <li className="list-group-item">
              Google Play Services
            </li>
          </ul>
          <p>Mitra pihak ketiga dapat mengumpulkan informasi untuk tujuan mereka sendiri sesuai dengan kebijakan privasi mereka. Kami menyarankan Anda untuk meninjau kebijakan privasi masing-masing pihak ketiga.</p>
          <h5>5. Iklan dan Pelacakan</h5>
          <p>
            Jika Aplikasi menampilkan iklan, kami dan mitra periklanan kami dapat menggunakan pengenal perangkat dan teknologi pelacakan (seperti cookies atau SDK) untuk menayangkan iklan yang relevan bagi Anda. <br /> Pengguna dapat memilih keluar dari iklan yang dipersonalisasi melalui pengaturan perangkat Android mereka: Buka Pengaturan   Google &gt; Iklan  &gt; Nonaktifkan Personalisasi Iklan
          </p>

          <h5>6. Hak Pengguna</h5>
          <p>
            Anda memiliki hak untuk:
          </p>
          <ul className="list-group list-group-numbered mb-4">
            <li className="list-group-item">
              Mengakses informasi pribadi Anda
            </li>
            <li className="list-group-item">
              Meminta perbaikan atau penghapusan data Anda
            </li>
            <li className="list-group-item">
              Menarik izin kapan saja (misalnya untuk akses lokasi)
            </li>
            <li className="list-group-item">
              Permintaan dapat diajukan melalui pos-el: davidrindu@gmail.com
            </li>
          </ul>

          <h5>7. Perubahan pada Kebijakan Privasi</h5>
          <p>
            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Jika ada perubahan signifikan, kami akan memberi tahu Anda melalui aplikasi atau email (jika tersedia). Versi terbaru akan selalu tersedia di Google Play Store atau dalam aplikasi.
          </p>
          <h5>8. Hubungi Kami</h5>
          <p>
            Jika Anda memiliki pertanyaan atau kekhawatiran tentang kebijakan ini, silakan hubungi kami:
          </p>
          <ul className="list-group list-group-numbered mb-4">
            <li className="list-group-item">
              Nama Developer: David Rindu Kurniawan
            </li>
            <li className="list-group-item">
              Email: davidrindu@gmail.com
            </li>
            <li className="list-group-item">
              Alamat: Dusun Karangrejo RT 2RW 3 Desa Karangrejo Kecamatan Kandat Kabupaten Kediri Jawa Timur Indonesia
            </li>
          </ul>
          <h5>8. Persetujuan</h5>
          <p>
            Dengan menggunakan Aplikasi ini, Anda dianggap telah membaca dan menyetujui Kebijakan Privasi ini.
          </p>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default KebijakanPrivasiARPage;
