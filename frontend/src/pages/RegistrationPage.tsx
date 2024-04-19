import React, { useEffect } from "react";
import { Navigate, useNavigation, useLoaderData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { CustomButton } from "../components/Buttons/CustomButton";
import { Link } from "react-router-dom";
import PathConstants from "../routes/PathConstants";
import useRegistration from "../hooks/useRegistration";
import Loader from "../components/Loader";
import { loader } from "../utils/loader";
import { useTranslation } from "react-i18next";
import Languages from "../components/LanguageMenu";

export function Registration() {
  const { formData, handleChange, handleSubmit, error } = useRegistration();
  const { state } = useNavigation();
  const loaderData = useLoaderData() as { user: object | null } | null;
  const user = loaderData ? loaderData.user : null;
  const isLoading = state === "loading";
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  if (isLoading) return <Loader title={t("registration.loading")} />;

  if (user && !isLoading) return <Navigate to={PathConstants.HOME} />;

  return (
    <div data-testid="perse" className="flex flex-col items-stretch font-body bg-black md:bg-gradient-to-b md:from-zinc-900 md:to-black">
      <header className="flex justify-between md:px-8 md:px-12 md:mb-8 bg-black">
        {/* Placeholder for other header elements */}
        <div className="w-full">
          {/* Empty div if needed for balancing header layout */}
        </div>
        <div className="w-1/8 max-w-[100px]"> {/* Adjust width and max-width as necessary */}
          <Languages />
        </div>
      </header>

      <main className="self-center w-full max-w-[46rem] flex flex-col items-stretch gap-4 px-8 md:px-28 md:py-5 pb-5 md:rounded-lg bg-black">
        <h1 className="text-3xl md:text-[2rem] md:text-center md:mb-2 font-extrabold">
          {t("registration.title")}
        </h1>

        <hr className="border-t-[1px] border-zinc-800" />
        <form
          className="flex flex-col gap-3 md:px-[5.5rem]"
          onSubmit={handleSubmit}
        >
          <FormInput
            type="text"
            id="email"
            name="email"
            placeholder={t("registration.email")}
            handleChange={handleChange}
            formData={formData.email}
          />

          <FormInput
            type="text"
            id="first_name"
            name="first_name"
            placeholder={t("registration.firstName")}
            handleChange={handleChange}
            formData={formData.first_name}
          />
          <FormInput
            type="text"
            id="last_name"
            name="last_name"
            placeholder={t("registration.lastName")}
            handleChange={handleChange}
            formData={formData.last_name}
          />

          <FormInput
            type="password"
            id="password"
            name="password"
            placeholder={t("registration.password")}
            formData={formData.password}
            handleChange={handleChange}
          />

          {error && <div className="text-red-500 text-sm mt-2 text-center">{error}</div>}

          <CustomButton type="submit" className="mt-5" customStyle="primary">
            {t("registration.submit")}
          </CustomButton>
        </form>

        <div className="flex flex-col gap-2 items-center text-center">
          <Link to="#">{t("registration.forgot")}</Link>
          <hr className="hidden md:block w-full border-t-[1px] mb-6 border-zinc-800" />
          <div className="flex flex-col gap-1 md:gap-2 md:flex-row">
            <Link to={PathConstants.HOME}>{t("registration.login")}</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export const RegistrationRoute = {
  path: PathConstants.REGISTER,
  element: <Registration />,
  loader: loader,
};
