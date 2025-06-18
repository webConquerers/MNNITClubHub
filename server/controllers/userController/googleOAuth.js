import { generateToken } from "../../utils/jwt.js";

// Called after Google OAuth success
export const googleCallback = (req, res) => {
  const user = req.user; 
  if (!user) {
    return res.redirect("http://localhost:5174/LoginUser?error=OAuthFailed");
  }

  const token = generateToken(user._id);
  const encodedName = encodeURIComponent(user.name);

  res.redirect(
    `http://localhost:5174/oauth-success?token=${token}&userName=${encodedName}&userId=${user._id}`
  );
};
