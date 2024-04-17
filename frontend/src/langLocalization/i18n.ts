import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({ 
    debug: true,
    fallbackLng: "en",
    returnObjects: true,
    resources: {
      en: {
        translation: {
            greeting: "Hello, World!",
            editUser: "Edit User",
            logOut: "Log out",
            updateOrdeleteUser: "Update or Delete User",
            email: "Email",
            password: "Password",
            firstName: "First Name",
            lastName: "Last Name",
            updateProfile: "Update Profile",
            cancel: "Cancel",
            deleteProfile: "Delete Profile",
            deleteProfileConfirm: "Are you sure you want to delete your profile? This action cannot be undone.",
            tryAgain: "Something went wrong. Please try again.",
            title: "TITLE",
            album: "ALBUM",
            playlist: "PLAYLIST",
            listOfRecommendationBasedOn: "List of recommendations based on",
            home: "Home",
            yourlibrary: "Your library",
            error: "ERROR!",
            errorLoadingPlaylists: "Something went wrong",
            rating: "Rating:",
            numberOfReviews: "Number of Reviews:",
            submitRatings: "Submit Rating",
            login: "Log in",
            logIn: "Log In",
            forgetYourPassword: "Forgot your password ?",
            noAccountyet: "Don't have an account?",
            notFound: "404 - NOT FOUND",
            register: "Registration",
            signIn: "Sign In",
            loginHere: "Login here",
            loading: "Loading..." ,
            generateRecommendations: "Generate recommendations",
        },
      },
      fr: {
        translation: {
            greeting: "Bonjour le monde!",
            editUser: "Modifier l'utilisateur",
            logOut: "Se déconnecter",
            updateOrdeleteUser: "Mettre à jour ou supprimer l'utilisateur",
            email: "Email",
            password: "Mot de passe",
            firstName: "Prénom",
            lastName: "Nom de famille",
            updateProfile: "Mettre à jour le profil",
            cancel: "Annuler",
            deleteProfile: "Supprimer le profil",
            deleteProfileConfirm: "Êtes-vous sûr de vouloir supprimer votre profil? Cette action est irréversible.",
            tryAgain: "Quelque chose s'est mal passé. Veuillez réessayer.",
            title: "TITRE",
            album: "ALBUM",
            playlist: "LISTE DE LECTURE",
            listOfRecommendationBasedOn: "Liste de recommandations basée sur",
            home: "Accueil",
            yourlibrary: "Votre bibliothèque",
            error: "ERREUR!",
            errorLoadingPlaylists: "Quelque chose s'est mal passé",
            rating: "Évaluation:",
            numberOfReviews: "Nombre de critiques:",
            submitRatings: "Soumettre une évaluation",
            login: "Se connecter",
            logIn: "Se connecter",
            forgetYourPassword: "Mot de passe oublié ?",
            noAccountyet: "Pas encore de compte ?",
            notFound: "404 - NON TROUVÉ",
            register: "Inscription",
            signIn: "Se connecter",
            loginHere: "Connectez-vous ici",
            loading: "Chargement...",
            generateRecommendations: "Générer des recommandations",
        },
      },
      hi: {
        translation: {
            greeting: "नमस्ते दुनिया!",
            editUser: "उपयोगकर्ता संपादित करें",
            logOut: "लॉग आउट",
            updateOrdeleteUser: "उपयोगकर्ता को अपडेट या हटाएं",
            email: "ईमेल",
            password: "पासवर्ड",
            firstName: "पहला नाम",
            lastName: "उपनाम",
            updateProfile: "प्रोफ़ाइल अपड ेट करें",
            cancel: "रद्द करें",
            deleteProfile: "प्रोफ़ाइल हटाएं",
            deleteProfileConfirm: "क्या आप वाकई अपनी प्रोफ़ाइल को हटाना चाहते हैं? यह कार्रवाई पूर्वानुमान नहीं की जा सकती है।",
            tryAgain: "कुछ गलत हो गया। कृपया पुन: प्रयास करें।",
            title: "शीर्षक",
            album: "एल्बम",
            playlist: "प्लेलिस्ट",
            listOfRecommendationBasedOn: "पर आधारित सिफारिशों की सूची",
            home: "घर",
            yourlibrary: "आपकी पुस्तकालय",
            error: "त्रुटि!",
            errorLoadingPlaylists: "कुछ गलत हो गया",
            rating: "रेटिंग:",
            numberOfReviews: "समीक्षाओं की संख्या:",
            submitRatings: "रेटिंग सबमिट करें",
            login: "लॉग इन करें",
            logIn: "लॉग इन करें",
            forgetYourPassword: "पासवर्ड भूल गए ?",
            noAccountyet: "अभी तक खाता नहीं है ?",
            notFound: "404 - नहीं मिला",
            register: "पंजीकरण",
            signIn: "साइन इन करें",
            loginHere: "यहाँ लॉगिन करें",
            loading: "लोड हो रहा है...",
            generateRecommendations: "सिफारिशें उत्पन्न करें",
        },
      },
      ar: {
        translation: {
            greeting: "مرحبا بالعالم!",
            editUser: "تحرير المستخدم",
            logOut: "تسجيل الخروج",
            updateOrdeleteUser: "تحديث    أو حذف المستخدم",
            email: "البريد الإلكتروني",
            password: "كلمه السر",
            firstName: "الاسم الاول",
            lastName: "الكنية",
            updateProfile: "تحديث الملف",
            cancel: "إلغاء",
            deleteProfile: "حذف الملف",
            deleteProfileConfirm: "هل أنت متأكد أنك تريد حذف ملفك الشخصي؟ لا يمكن التراجع عن هذا الإجراء.",
            tryAgain: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
            title: "عنوان",
            album: "الألبوم",
            playlist: "قائمة التشغيل",
            listOfRecommendationBasedOn: "قائمة التوصيات استنادًا إلى",
            home: "الصفحة الرئيسية",
            yourlibrary: "مكتبتك",
            error: "خطأ!",
            errorLoadingPlaylists: "حدث خطأ ما",
            rating: "تقييم:",
            numberOfReviews: "عدد المراجعات:",
            submitRatings: "تقديم التقييم",
            login: "تسجيل الدخول",
            logIn: "تسجيل الدخول",
            forgetYourPassword: "نسيت كلمة المرور ؟",
            noAccountyet: "ليس لديك حساب بعد ؟",
            notFound: "404 - غير موجود",
            register: "التسجيل",
            signIn: "تسجيل الدخول",
            loginHere: "تسجيل الدخول هنا",
            loading: "جار التحميل...",
            generateRecommendations: "توليد التوصيات",
        },
      },
      ja: {
        translation: {
            greeting: "こんにちは、世界！",
            editUser: "ユーザーを編集",
            logOut: "ログアウト",
            updateOrdeleteUser: "ユーザーの更新または削除",
            email: "Eメール",
            password: "パスワード",
            firstName: "名",
            lastName: "苗字",
            updateProfile: "プロフィールを更新",
            cancel: "キャンセル",
            deleteProfile: "プロフィールを削除",
            deleteProfileConfirm: "本当にプロフィールを削除しますか？この操作は元に戻すことはできません。",
            tryAgain: "何かがうまくいかなかった。もう一度お試しください。",
            title: "タイトル",
            album: "アルバム",
            playlist: "プレイリスト",
            listOfRecommendationBasedOn: "に基づく推薦のリスト",
            home: "ホーム",
            yourlibrary: "あなたのライブラリ",
            error: "エラー！",
            errorLoadingPlaylists: "何かがうまくいかなかった",
            rating: "評価:",
            numberOfReviews: "レビュー数:",
            submitRatings: "評価を送信",
            login: "ログイン",
            logIn: "ログイン",
            forgetYourPassword: "パスワードをお忘れですか？",
            noAccountyet: "まだアカウントを持っていませんか？",
            notFound: "404 - 見つかりません",
            register: "登録",
            signIn: "サインイン",
            loginHere: "ここでログイン",
            loading: "読み込み中...",
            generateRecommendations: "推奨事項を生成",
        },
      },
        ru: {
            translation: {
                greeting: "Привет, мир!",
                editUser: "Редактировать пользователя",
                logOut: "Выйти",
                updateOrdeleteUser: "Обновить или удалить пользователя",
                email: "Электронная почта",
                password: "Пароль",
                firstName: "Имя",
                lastName: "Фамилия",
                updateProfile: "Обновить профиль",
                cancel: "Отмена",
                deleteProfile: "Удалить профиль",
                deleteProfileConfirm: "Вы уверены, что хотите удалить свой профиль? Это действие нельзя отменить.",
                tryAgain: "Что-то пошло не так. Пожалуйста, попробуйте снова.",
                title: "Заголовок",
                album: "Альбом",
                playlist: "Плейлист",
                listOfRecommendationBasedOn: "Список рекомендаций на основе",
                home: "Дом",
                yourlibrary: "Ваша библиотека",
                error: "ОШИБКА!",
                errorLoadingPlaylists: "Что-то пошло не так",
                rating: "Рейтинг:",
                numberOfReviews: "Количество отзывов:",
                submitRatings: "Отправить рейтинг",
                login: "Войти",
                logIn: "Войти",
                forgetYourPassword: "Забыли пароль ?",
                noAccountyet: "Еще нет аккаунта ?",
                notFound: "404 - НЕ НАЙДЕНО",
                register: "Регистрация",
                signIn: "Войти",
                loginHere: "Войдите здесь",
                loading: "Загрузка...",
                generateRecommendations: "Создать рекомендации",
            },
        },
        fi: {
            translation: {
                greeting: "Hei maailma!",
                editUser: "Muokkaa käyttäjää",
                logOut: "Kirjaudu ulos",
                updateOrdeleteUser: "Päivitä tai poista käyttäjä",
                email: "Sähköposti",
                password: "Salasana",
                firstName: "Etunimi",
                lastName: "Sukunimi",
                updateProfile: "Päivitä profiili",
                cancel: "Peruuta",
                deleteProfile: "Poista profiili",
                deleteProfileConfirm: "Haluatko varmasti poistaa profiilisi? Tätä toimintoa ei voi peruuttaa.",
                tryAgain: "Jotain meni pieleen. Yritä uudelleen.",
                title: "OTSIKKO",
                album: "ALBUMI",
                playlist: "SOITELISTA",
                listOfRecommendationBasedOn: "Suositusluettelo perustuu",
                home: "Kotisivu",
                yourlibrary: "Kirjastosi",
                error: "VIRHE!",
                errorLoadingPlaylists: "Jotain meni pieleen",
                rating: "Arvio:",
                numberOfReviews: "Arvostelujen määrä:",
                submitRatings: "Lähetä arvostelu",
                login: "Kirjaudu sisään",
                logIn: "Kirjaudu sisään",
                forgetYourPassword: "Unohditko salasanasi ?",
                noAccountyet: "Ei vielä tiliä ?",
                notFound: "404 - EI LÖYDY",
                register: "Rekisteröinti",
                signIn: "Kirjaudu sisään",
                loginHere: "Kirjaudu sisään täällä",
                loading: "Ladataan...",
                generateRecommendations: "Luo suosituksia",

            },
        },
    },
});

export default i18n;
