import React from "react";
import { useTranslation } from 'react-i18next';

export default function Page404() {
    const {t} = useTranslation();
    return <div><h1>{t("notFound")}</h1></div>
}    