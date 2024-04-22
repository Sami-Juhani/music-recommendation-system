// useRegistration.ts
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PathConstants from "../routes/PathConstants";
import { useTranslation } from "react-i18next";

const BASE_URL = process.env.REACT_APP_BASE_URL;

interface RegistrationFormState {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

const useRegistration = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<RegistrationFormState>({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/user/register`, {
        method: "POST",
        headers: {
          'Accept-Language': i18n.language,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        //setNotification({ text: data.message, success: false });
        setError(
          data.message || "An unexpected error occurred. Please try again."
        );
      }

      if (response.ok) {
        // setNotification({
        //   text: "Registration succesfull, please login...",
        //   success: true,
        // });
        navigate(PathConstants.HOME);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { formData, handleChange, handleSubmit, error };
};

export default useRegistration;
