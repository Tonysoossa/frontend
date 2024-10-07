import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Prompt from "../components/Prompt/PromptToken";

interface PrivateRouteProps {
  children: JSX.Element;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("authToken");
  const [showPrompt, setShowPrompt] = useState(false); // État pour gérer l'affichage de la prompt

  useEffect(() => {
    // Rediriger si pas de token
    if (!token) {
      setShowPrompt(true);
    }
  }, [token]);

  const handleClosePrompt = () => {
    setShowPrompt(false);
    navigate("/login");
  };

  return (
    <>
      {token ? children : null}
      {showPrompt && (
        <Prompt
          message="Vous n'êtes pas connecté. Merci de vous connecter pour accéder à ces fonctions."
          onClose={handleClosePrompt}
        />
      )}
    </>
  );
}
