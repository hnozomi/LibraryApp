import { useNavigate } from "react-router-dom";

export const usePageTransition = () => {
  const navigate = useNavigate();

  const pageTransition = (page: string, state: any = "undeified") => {
    navigate(page, { state: state });
  };

  return { pageTransition };
};
