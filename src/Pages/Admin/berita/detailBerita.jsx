import { Link } from "react-router-dom";
import AdminLayout from "../adminLayout";
import { ArrowLeft } from "../forumQuiz/forumDetail";

const DetailBerita = () => {
  return (
    <AdminLayout>
      <Link
        to={"../"}
        className="d-flex align-items-center gap-2 text-dark text-decoration-none"
      >
        <ArrowLeft />
        <p className="mb-0">Detail Berita</p>
      </Link>
      <hr />
      <div className="d-flex flex-column gap-3 justify-items-start">
        <img
          src="https://placehold.co/600x400"
          className=""
          style={{ height: "300px" }}
        />
        <h1>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores,
          sunt.
        </h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores
          itaque voluptate repellat similique architecto, sunt, minus
          dignissimos quia ab distinctio illo. Ut, quidem repudiandae? Et ipsum
          commodi, quibusdam pariatur doloribus unde ad necessitatibus? Rerum
          omnis officia ullam nulla aliquam! Eaque, corrupti fuga? Incidunt
          recusandae possimus rerum eum in, laborum quasi animi! Deleniti nulla
          quaerat voluptatem, similique rerum nobis error aliquam consequuntur
          delectus soluta. Iusto ad commodi aspernatur, molestiae non laboriosam
          ullam rerum, dolores omnis maxime neque unde repellendus, sint quos
          corporis tempore dolore eum nostrum? Quo magni placeat repellendus ut
          nulla commodi voluptatum corporis, doloremque mollitia ducimus,
          doloribus nihil debitis.
        </p>
        <p>Publish Date : {"20-10-2025"}</p>
      </div>
    </AdminLayout>
  );
};

export default DetailBerita;
