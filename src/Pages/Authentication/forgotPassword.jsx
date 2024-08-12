import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import errorMessage from "../../Component/errorMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getValidationCode } from "../../lib/redux/api/auth";
import AuthTemplate from "./authTemplate";

const getCodeSchema = Yup.object({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  // .test(
  //     "checkUniqueEmail",
  //     "The Email Address could not be found.",
  //     async (value) => {
  //         const checkEmail = await axios.get(`http://localhost:5000/api/auth/email?search=${value}`)
  //         // const isUnique = await isEmailUnique(value);
  //         return checkEmail.data.checkEmailExists;
  //     }
  // )
});
const validationCodeSchema = Yup.object({
  code: Yup.string().required("code required"),
});
const changePassSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Your password is to short")
    .required("Please input a password")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain at least one special character"
    ),
});

const forgotPassword = () => {
  const [isVAlidation, setIsValidation] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [email, setEmail] = useState();

  const dispatch = useDispatch();
  const { validationToken, isLoading } = useSelector((state) => state.auth);

  const post = async ({ email }) => {
    dispatch(getValidationCode(email));
    setEmail(email);
    setIsValidation(true);
  };

  const checkValidationCode = async ({ code }) => {
    if (code === validationToken) {
      setIsChangingPass(true);
      setIsValidation(false);
    }
  };

  const navigate = useNavigate();
  const handleChangePass = async ({ newPassword }) => {
    alert(`Your new password : ${newPassword}`);
    navigate("/");
  };

  const SendCode = () => {
    return (
      <AuthTemplate>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={getCodeSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, { setSubmitting }) => {
            post(values);
            setSubmitting(false);
          }}
        >
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" render={errorMessage} />

            <button type="submit">Send Reset Code</button>
          </Form>
        </Formik>
      </AuthTemplate>
    );
  };

  const ValidationCode = () => {
    return (
      <AuthTemplate>
        <p>Code Telah Dikirim Ke {email}</p>
        <Formik
          initialValues={{ code: "" }}
          validationSchema={validationCodeSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, { setSubmitting }) => {
            checkValidationCode(values);
            setSubmitting(false);
          }}
        >
          <Form>
            <Field type="text" name="code" />
            <ErrorMessage name="code" render={errorMessage} />

            <button type="submit">Check Validation</button>
          </Form>
        </Formik>
      </AuthTemplate>
    );
  };

  const ChangePassword = () => {
    return (
      <AuthTemplate>
        <Formik
          initialValues={{ newPassword: "" }}
          validationSchema={changePassSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, { setSubmitting }) => {
            handleChangePass(values);
            setSubmitting(false);
          }}
        >
          <Form>
            <Field type="text" name="newPassword" />
            <ErrorMessage name="newPassword" render={errorMessage} />

            <button type="submit">Change</button>
          </Form>
        </Formik>
      </AuthTemplate>
    );
  };

  if (isLoading) return <p>Loading....</p>;
  if (!isVAlidation && !isChangingPass) return <SendCode />;
  if (isVAlidation && !isChangingPass) return <ValidationCode />;
  if (!isVAlidation && isChangingPass) return <ChangePassword />;
};

export default forgotPassword;
