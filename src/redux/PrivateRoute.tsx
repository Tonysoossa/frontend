import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Prompt from "../components/Prompt/PromptToken";
import { RootState, AppDispatch } from "../redux/store";
import { setShowPrompt } from "../redux/promptSlice";

interface PrivateRouteProps {
  children: JSX.Element;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const showPrompt = useSelector((state: RootState) => state.prompt.showPrompt);

  useEffect(() => {
    // Afficher la prompt si pas de token
    if (!token) {
      dispatch(setShowPrompt(true));
    }
  }, [token, dispatch, navigate]);

  const handleClosePrompt = () => {
    dispatch(setShowPrompt(false));
  };

  return (
    <>
      {token && children}
      {showPrompt && (
        <Prompt
          message="Vous n'êtes pas connecté. Merci de vous connecter pour accéder à ces fonctions."
          onClose={handleClosePrompt}
        />
      )}
    </>
  );
}
