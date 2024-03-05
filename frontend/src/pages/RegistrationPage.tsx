import React from "react";
import { Navigate, useNavigation, useLoaderData  } from "react-router-dom";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { Link } from "react-router-dom";
import PathConstants from "../routes/PathConstants";
import useRegistration from "../hooks/useRegistration";
import Loader from "../components/Loader";


const BASE_URL="http://127.0.0.1:8000"

function Registration() {
  const { formData, handleChange, handleSubmit } = useRegistration();
  const { state } = useNavigation();
  const loaderData = useLoaderData() as { user: object | null } | null;
  const user = loaderData ? loaderData.user : null;
  const isLoading = state === "loading";

  if (isLoading) return <Loader title={"Loading"} />

  if (user && !isLoading) return <Navigate to={PathConstants.HOME} />;


  return (
    <div className="flex flex-col items-stretch font-body bg-black md:bg-gradient-to-b md:from-zinc-900 md:to-black">
      <header className="md: px-8 md:px-12 md:mb-8 bg-black">
        {/* <nav>
        <Link to={PathConstants.HOME}>Home</Link>
        </nav> */}
      </header>

      <main className="self-center w-full max-w-[46rem] flex flex-col items-stretch gap-8 px-8 md:px-28 md:py-5 pb-5 md:rounded-lg bg-black">
        <h1 className="text-3xl md:text-[2rem] md:text-center md:mb-2 font-extrabold">
          Registration
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
            placeholder="Email"
            handleChange={handleChange} 
            formData={formData.email}
          />

          <FormInput
            type="text"
            id="first_name"
            name="first_name"
            placeholder="First Name"
            handleChange={handleChange} 
            formData={formData.first_name}
          />
           <FormInput
            type="text"
            id="last_name"
            name="last_name"
            placeholder="First Name"
            handleChange={handleChange} 
            formData={formData.last_name}
          />

          <FormInput
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            formData={formData.password}
            handleChange={handleChange}
          />

          <PrimaryButton type="submit" className="mt-5">
            Sign In
          </PrimaryButton>
        </form>

        <div className="flex flex-col gap-2 items-center text-center">
            <Link to="#">Forgot your password ?</Link>
            <hr className="hidden md:block w-full border-t-[1px] mb-6 border-zinc-800" />
            <div className="flex flex-col gap-1 md:gap-2 md:flex-row">
              <Link to={PathConstants.HOME}>Login here</Link>
            </div>
        </div>
      </main>
    </div>
  );
}
async function loader({ request: { signal }} : { request: { signal: AbortSignal } }) {
  try {
      const response = await fetch(`${BASE_URL}/api/user/get`, {
        signal,
        credentials: "include",
      });

      if (response.status !== 200) {
        return null;
      }

      const data = await response.json();
      
      return { user : data.user };
  } catch (error: any) {
      if (error.name === "AbortError") {
        return;
      }
      return null;
  }
}
export const RegistrationRoute = {
  path: PathConstants.REGISTER,
  element: <Registration />,
  loader: loader,
}