import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

let users = [];
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SERECT,
      callbackURL: `${process.env.GOOGLE_CALLBACK_URL}`,
    },
    (accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value || null,
      };

      // Push to your local array for tracking
      users.push(newUser);

      console.log("Logged in user:");
      console.table(newUser);
      console.table("Access Token: " + accessToken);
      console.table("refresh Token: " + refreshToken);

      return done(null, newUser);
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
