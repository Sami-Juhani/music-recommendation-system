import React, { useEffect } from "react";
import FormInput from "../components/FormInput";
import { CustomButton } from "../components/Buttons/CustomButton";
import { Link } from "react-router-dom";
import PathConstants from "../routes/PathConstants";
import { useLogin } from '../hooks/useLogin'
import { useTranslation } from "react-i18next";
import Languages from "../components/LanguageMenu";

export default function Login() {
  const { formData, handleChange, handleSubmit, error } = useLogin();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  return (
    <div className="flex flex-col items-stretch font-body bg-black md:bg-gradient-to-b md:from-zinc-900 md:to-black">
      <header className="flex px-6 py-4 mb-8 bg-black items-center justify-end">
          <Languages />
      </header>
      <main className="self-center w-full max-w-[46rem] flex flex-col items-stretch gap-8 px-8 md:px-28 md:py-5 pb-5 md:rounded-lg bg-black">
        <h1 
        className="text-3xl md:text-[2rem] md:text-center md:mb-2 font-extrabold"
        data-testid="login-title">
          {t('login.title')}
        </h1>

        <hr className="border-t-[1px] border-zinc-800" />
        <form
          className="flex flex-col gap-3 md:px-[5.5rem]"
          onSubmit={handleSubmit}
        >
          <FormInput
            type="email"
            id="email"
            name="email"
            dataTestId="loginEmailInput"
            placeholder={(t('login.email') as string)}
            handleChange={handleChange} 
            formData={formData.email}
          />

          <FormInput
            type="password"
            id="password"
            name="password"
            dataTestId="loginPasswordInput"
            placeholder={(t('login.password') as string)}
            formData={formData.password}
            handleChange={handleChange}
          />

          <CustomButton type="submit" className="mt-5" dataTestId="loginSubmitBtn" customStyle="primary">
            {t('login.submit')}
          </CustomButton>
        </form>

        {error && <div className="text-red-500 text-sm mt-2 text-center">{error}</div>}

        <div className="flex flex-col gap-2 items-center text-center">
            <Link to="#">{t('login.forgot')}</Link>
            <hr className="hidden md:block w-full border-t-[1px] mb-6 border-zinc-800" />
            <div className="flex flex-col gap-1 md:gap-2 md:flex-row">
              <Link to={PathConstants.REGISTER}>{t('login.register')}</Link>
            </div>
        </div>
      </main>
    </div>
  );
}