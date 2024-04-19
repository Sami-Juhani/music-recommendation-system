import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";
import PathConstants from "../routes/PathConstants";
import "../styles/ProfileUpdate.css";
import { UserContextType } from "../types/UserContextType";

const BASE_URL = process.env.REACT_APP_BASE_URL;

interface ProfileUpdateFormState {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

const ProfileUpdate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, setUser }: UserContextType = useContext(UserContext);

  const [formData, setFormData] = useState<ProfileUpdateFormState>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || !("id" in user)) {
      console.error("No user is logged in or user has no id");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        console.error("HTTP error", response.status);
        return;
      }

      const data = await response.json();

      if (response.ok) {
        console.log("Profile update successful:", data);
        setUser(data.user);
        navigate(PathConstants.HOME);
      } else {
        console.error("Profile update failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteProfile = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmDelete = window.confirm(t("profile.confirmation"));

    if (!confirmDelete) {
      return;
    }

    if (!user || !("id" in user)) {
      console.error("No user is logged in or user has no id");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/user/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        console.error("HTTP error", response.status);
        return;
      }

      const data = await response.json();

      if (response.ok) {
        console.log("Profile delete successful:", data);
        setUser(data.user);
        navigate(PathConstants.HOME);
      } else {
        console.error("Profile delete failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{t("profile.title")}</h2>
      <form onSubmit={handleSubmit} className="profile_update_form">
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("profile.email")}
        />
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          placeholder={t("profile.password")}
        />
        <input
          type="text"
          name="first_name"
          autoComplete="given-name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder={t("profile.firstName")}
        />
        <input
          type="text"
          name="last_name"
          autoComplete="family-name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder={t("profile.lastName")}
        />
        <button className="update_profile" type="submit">
          {t("profile.submit")}
        </button>
        <button className="cancel" type="button" onClick={() => navigate(PathConstants.HOME)}>
          {t("profile.cancel")}
        </button>
        <button type="submit" className="delete" onClick={deleteProfile}>
          {t("profile.delete")}
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
