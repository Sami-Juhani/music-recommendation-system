// Logout.tsx
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/Layout";
import PathConstants from "../routes/PathConstants";

const Logout = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(undefined);
    navigate(PathConstants.LOGIN);
  }, [setUser, navigate]);

  return null;
};

export default Logout;