import React, {useState, useEffect } from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import UsersInfo from "./UsersInfo";

const FormUser = ({values, touched, errors, status}) => {
    const [user, setUser] = useState([])

    useEffect(()=>{
        status && setUser(user => [...user, status]);
    },[status])

    return(
        <div className="userForm">
            <Form>
                <Field
                    type="text"
                    name="name"
                    placeholder="Name"/>
                {touched.name && errors.name && (
                    <p className="errorReq">{errors.name}</p>
                )}
                <Field
                    type="email"
                    name="email"
                    placeholder="email@email.com"/>
                {touched.email && errors.email && (
                    <p className="errorReq">{errors.email}</p>
                )}
                <Field
                    type="password"
                    name="password"
                    placeholder="password"/>
                {touched.password && errors.password && (
                    <p className="errorReq">{errors.password}</p>
                )}
                <label htmlFor="terms"> {" "} Agree to Terms of Service
                <Field
                    type="checkbox"
                    name="terms"
                    checked={values.terms}/>
                {touched.terms && errors.terms && (
                    <p className="errorReq">{errors.terms}</p>
                )}
                </label>
                <button type="submit">Add User</button>
            </Form>
            <UsersInfo user={user}/>
        </div>
    )
};

const FormikForm = withFormik ({
    mapPropsToValues({name, email, password, terms}){
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false,
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("name is required"),
        email: Yup.string().required("email is required"),
        password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
        terms: Yup.boolean().oneOf([true], "Please accept our Terms")
    }),

    handleSubmit(values, { setStatus }) {
        axios
            .post("https://reqres.in/api/users/", values)
            .then(response => { setStatus(response.data); })
            .catch(error => console.log(error));
    }
})(FormUser);

export default FormikForm;