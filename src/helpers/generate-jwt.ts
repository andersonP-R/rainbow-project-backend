import jwt from "jsonwebtoken";

export const generateJWT = (uid: string) => {
  return new Promise((res, rej) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.JWTSECRET!,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) {
          console.log(err);
          rej("Error generating token.");
        } else {
          res(token);
        }
      }
    );
  });
};
