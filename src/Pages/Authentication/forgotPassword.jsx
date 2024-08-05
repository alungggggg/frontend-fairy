import Header from "../template/header"
import Footer from "../template/footer"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios";
import errorMessage from "../../Component/errorMessage";

const post = async ({ email }) => {
    const sendEmail = await axios.post("http://localhost:5000/api/forgot-password", { email })
    console.log(sendEmail);
}

const schema = Yup.object({
    email: Yup.string()
        .email("Email is invalid")
        .required("Email is required")
        .test(
            "checkUniqueEmail",
            "The Email Address could not be found.",
            async (value) => {
                const checkEmail = await axios.get(`http://localhost:5000/api/auth/email?search=${value}`)
                // const isUnique = await isEmailUnique(value);
                return checkEmail.data.checkEmailExists;
            }
        )
});

// const checkEmail = await axios.get(`http://localhost:5000/api/auth/email?search=papa`)
// console.log(checkEmail)

const forgotPassword = () => {
    return (
        <>
            <Header />
            <Formik
                initialValues={{ email: "" }}
                validationSchema={schema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values, { setSubmitting }) => {
                    post(values)

                    // submit(values);
                    // setSubmitting(false);
                    // console.log(values)
                    // console.log("values")
                }}>
                <Form>
                    <Field type="email" name="email" />
                    <ErrorMessage
                        name="email"
                        render={errorMessage}
                    />

                    <button type="submit">Send Reset Code</button>
                </Form>
            </Formik>
            <Footer />
        </>
    )
}

export default forgotPassword