import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetInvitationByCredential } from "../services/project";

export default function VerifyLink() {
  const navigateTo = useNavigate();
  const { linkId } = useParams();
  useEffect(() => {
    const verifyLink = async () => {
      try {
        const verify = await GetInvitationByCredential({ token: linkId });
        if (verify.length > 0) {
          navigateTo(`/invite/accept-invitation/${verify[0]._id}`);
        }
      } catch (error) {
        console.error("Error al verificar el enlace:", error);
      }
    };

    verifyLink();
  }, [linkId, navigateTo]);

  return null;
}
