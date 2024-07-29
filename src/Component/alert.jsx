import Swal from "sweetalert2"

const alert = (message, status) => {
    Swal.fire({
        title: status,
        text: message,
        icon: status,
    });
}
export const confirmSwal = (title, text) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    })
}

export default alert;