import * as yup from "yup";

export const userInfoSchema = yup.object().shape({
    firstName: yup.string().trim().defined("First name is required"),
    lastName: yup.string().trim().defined("Last name is required"),
    otherName: yup.string().trim(),
    email: yup.string().trim().email().defined("Email is required"),
    passportUrl: yup.string().trim().url().defined("Passport is required"),
    phoneNumber: yup.string().trim().defined("Phone number is required"),
    password: yup.string().min(8, "Password must be at least 8 characters in length").max(15, "Password must not be more than 15 characters in length")
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            "Password must include at least one lower case letter, upper case letter, a number and special character."
        ).trim().defined("Password is required"),
    gender: yup.string().trim().defined("Gender is required"),
    isAdmin: yup.boolean().default(false),
})

export const loginDataSchema = yup.object().shape({
    email: yup.string().trim().email().defined("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters in length").max(15, "Password must not be more than 15 characters in length")
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            "Password must include at least one lower case letter, upper case letter, a number and special character."
        ).trim().defined("Password is required"),
})

