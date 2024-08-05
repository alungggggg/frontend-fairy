import Header from "../../template/header"
import Footer from "../../template/footer"
import { useState } from "react"
import Swal from 'sweetalert2';

const quiz = () => {

    const [answer, setAnswer] = useState([])
    const pertanyaanPilihanGanda = [
        {
            id: "A1",
            soal: 'Siapakah yang memimpin Kerajaan Jenggala?',
            pilihanGanda: ["Raja Jayengrana", "Raja Jayengnegara", "Airlangga", "Panji Asmarabangun"],
            jawaban: "Raja Jayengnegara"
        },

        {
            id: "A2",
            soal: 'Apa nama asli Kleting Kuning? ',
            pilihanGanda: ["Dewi Sekartaji", "Nyai Intan", "Kleting Abang", "Mbok Randa"],
            jawaban: "Dewi Sekartaji"
        },

        {
            id: "A3",
            soal: 'Berapa jumlah putri Nyai Intan?',
            pilihanGanda: [2, 3, 4, 5],
            jawaban: 3
        },

        {
            id: "A4",
            soal: 'Di mana Panji Asmarabangun menyamar sebagai Ande Ande Lumut?',
            pilihanGanda: ["Desa Dadapan", "Kerajaan Jenggala", "Kerajaan Kediri", "Desa Kahuripan"],
            jawaban: "Desa Dadapan"
        },

        {
            id: "A5",
            soal: 'Siapakah yang membantu Kleting Kuning menyeberangi sungai?',
            pilihanGanda: ["Burung Bangau", "Yuyu Kangkang", "Mbok Randa", "Panji Asmarabangun"],
            jawaban: "Yuyu Kangkang"
        },

    ]

    const uraian =
        [
            {
                soal: 'Mengapa Panji Asmarabangun mengadakan sayembara mencari jodoh?',
                jawaban: ["mencari istrinya", "Dewi Sekartaji", "hilang", "diserang musuh."],
            },

            {
                soal: 'Bagaimana perlakuan Nyai Intan dan ketiga putrinya terhadap Kleting Kuning? ',
                jawaban: ["memperlakukan Kleting Kuning dengan buruk", "menyuruhnya mengerjakan semua pekerjaan rumah", "sering membentaknya"],
            },

            {
                soal: 'Apa pesan moral utama yang dapat diambil dari cerita Ande-Ande Lumut?',
                jawaban: ["Kesetiaan, kejujuran"],
            },

            {
                soal: 'Bagaimana cara Kleting Kuning akhirnya dapat menyeberangi sungai?',
                jawaban: ["menggunakan cambuk", "menyurutkan air sungai"],
            },

            {
                soal: 'Bagaimana cara Kleting Kuning akhirnya dapat menyeberangi sungai?',
                jawaban: ["menggunakan cambuk", "menyurutkan air sungai"],
            },

            {
                soal: 'Buatlah kembali cerita ande ande lumut dengan bahasamu sendiri dengan tetap memperhatikan tema, latar, dan tokoh cerita yang sesuai.',
                jawaban: ["kesetiaan, kejujuran", "Kerajaan Jenggala", "Desa Dadapan", "Sungai Bengawan Solo", "Panji Asmarabangun", "Ande-Ande Lumut"],
            },

        ]

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAnswer({
            ...answer,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault()

        let score = 0;
        let totalQuestions = pertanyaanPilihanGanda.length;

        pertanyaanPilihanGanda.forEach(question => {
            console.log(question.jawaban)
            if (answer[question.id] === question.jawaban) {
                score++;
            }
        });
        // {
        //     score,
        //     totalQuestions,
        //     percentage: (score / totalQuestions) * 100
        // }
        Swal.fire({
            title: "Berhasil Submit",
            text: `nilai kamu adalah ${(score / totalQuestions) * 100}`,
            icon: "success"
        });

        return {
            score,
            totalQuestions,
            percentage: (score / totalQuestions) * 100
        };
    }

    return (
        <>
            <Header />

            <form name="form">
                {pertanyaanPilihanGanda.map((soal) => (
                    <div key={soal.id}>
                        <label htmlFor="">{soal.soal}</label>

                        <input type="radio" id={`A${soal.id}`} name={soal.id} onChange={handleChange} value={soal.pilihanGanda[0]} />
                        <label htmlFor={`A${soal.id}`}>{soal.pilihanGanda[0]}</label>

                        <input type="radio" id={`B${soal.id}`} name={soal.id} onChange={handleChange} value={soal.pilihanGanda[1]} />
                        <label htmlFor={`B${soal.id}`}>{soal.pilihanGanda[1]}</label>

                        <input type="radio" id={`C${soal.id}`} name={soal.id} onChange={handleChange} value={soal.pilihanGanda[2]} />
                        <label htmlFor={`C${soal.id}`}>{soal.pilihanGanda[2]}</label>

                        <input type="radio" id={`D${soal.id}`} name={soal.id} onChange={handleChange} value={soal.pilihanGanda[3]} />
                        <label htmlFor={`D${soal.id}`}>{soal.pilihanGanda[3]}</label>
                    </div>
                ))}
                <button type="submit" onClick={handleSubmit}>submit</button>
            </form>


            <Footer />
        </>
    )

}

export default quiz