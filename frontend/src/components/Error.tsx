import React from "react";
import { useTranslation } from 'react-i18next';

const Error = () => {
    const {t} = useTranslation();
    return (
        <div className="w-full flex justify-center items-center">
            <h1 className="font-bold text-2xl text-white mt-2">{t("tryAgain")}</h1>
        </div>
    );
}

export default Error;