import { useNavigate } from "react-router-dom";

export const usePageTransition = () => {
  const navigate = useNavigate();

  const pageTransition = (page: string, state: any = "undeified") => {
    console.log(state);
    navigate(page, { state: state });
  };

  return { pageTransition };
};
