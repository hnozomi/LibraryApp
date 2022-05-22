import { useNavigate } from "react-router-dom";

export const usePageTransition = () => {
  const navigate = useNavigate();

  const pageTransition = (page: string) => {
    navigate(page);
  };

  return { pageTransition };
};
