import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SERECT,
      callbackURL: `${process.env.GOOGLE_CALLBACK_URL}`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const userData = {
        accessToken,
        refreshToken,
        externalId: profile.id, //Googleid
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value || null,
        provider: "google",
      };

      return done(null, userData);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.googleId === id);
  done(null, user || false);
});

export default passport;
