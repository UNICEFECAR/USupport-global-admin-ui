import { useNavigate } from "react-router-dom";

export const useCustomNavigate = () => {
  const navigate = useNavigate();
  const language = localStorage.getItem("language");

  // URL Should include "/"
  const customNavigate = (url, state) => {
    console.log(url, "url to redirect");
    if (url === -1) {
      navigate(-1);
      return;
    }
    navigate(`/global-admin/${language}${url}`, state);
  };

  return customNavigate;
};
