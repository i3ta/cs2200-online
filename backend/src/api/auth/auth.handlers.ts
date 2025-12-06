import { config } from "@/config/config";
import { User } from "@/entity/User";
import { Request, Response } from "express";
import { parseString } from "xml2js";

/**
 * Initiates the CAS authentication flow by redirecting to Georgia Tech's login
 * page.
 *
 * @param {Request} _req - Express request object
 * @param {Response} res - Express response object
 * @returns {Response} Redirects the user to the CAS login URL
 */
export const authRedirect = (_req: Request, res: Response) => {
  const redirectUrl = `${config.casLoginUrl}?service=${encodeURIComponent(
    config.serviceUrl,
  )}`;

  return res.redirect(redirectUrl);
};

/**
 * Frontend calls this to get the CAS login URL. Stores any returnUrl in
 * session so callback can redirect back.
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const getLoginUrl = (req: Request, res: Response) => {
  const { returnUrl } = req.query;
  if (returnUrl && typeof returnUrl === "string") {
    req.session.returnUrl = returnUrl;
  }
  const loginUrl = `${config.casLoginUrl}?service=${encodeURIComponent(
    config.serviceUrl,
  )}`;

  res.status(200).json({ url: loginUrl });
  return;
};

/**
 * Parses XML string into a JavaScript object.
 *
 * @param {string} xml - The XML string to parse
 * @returns {Promise<any>} Promise resolving to the parsed JavaScript object
 * @throws {Error} If XML parsing fails
 */
const parseXml = (xml: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    parseString(xml, { explicitArray: false }, (err, result) => {
      if (err) {
        return reject(new Error("Error parsing CAS response."));
      }
      resolve(result);
    });
  });
};

/**
 * Handles the CAS callback after user authentication. Validates the ticket
 * received from CAS and creates a user session if valid.
 *
 * @param {Request} req - Express request object containing the CAS ticket in query params
 * @param {Response} res - Express response object
 * @returns {Response} Redirects to frontend on success or returns error status on failure
 */
export const authCallback = async (req: Request, res: Response) => {
  const { ticket } = req.query;
  if (!ticket) {
    res.status(422).send("Ticket not provided.");
    return;
  }

  try {
    const validationUrl = `${
      config.casValidateUrl
    }?service=${encodeURIComponent(
      config.serviceUrl,
    )}&ticket=${encodeURIComponent(ticket as string)}`;

    const response = await fetch(validationUrl);
    if (!response.ok) {
      res.status(500).send(`HTTP error: ${response.status}`);
      return;
    }

    const responseText = await response.text();

    const parsedResult = await parseXml(responseText);
    const serviceResponse = parsedResult?.["cas:serviceResponse"];

    // Fail early if CAS response isn't as expected
    if (!serviceResponse) {
      res.status(500).send("Invalid CAS service response.");
      return;
    }

    // Fail early if no authentication success
    if (!serviceResponse["cas:authenticationSuccess"]) {
      res.status(500).send("CAS authentication failed.");
      return;
    }

    // If successful, extract user info and attach to session
    const user = serviceResponse["cas:authenticationSuccess"]["cas:user"];
    req.session.user = user;
    req.session.save((err) => {
      if (err) {
        console.error("Failed to save session:", err);
        return res.status(500).send("Session save error");
      }

      // after successful login, send them back to wherever they started (or fallback)
      const sess = req.session;
      const redirectTo = sess.returnUrl || config.frontendUrl;
      delete sess.returnUrl;
      return res.redirect(redirectTo);
    });

    return;
  } catch (error) {
    console.error(error);
    res.status(500).send("Error validating ticket.");

    return;
  }
};

/**
 * Check authentication status and retrieve username.
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Response} JSON response with username if authenticated or error if not
 */
export const getUser = async (req: Request, res: Response) => {
  const username = req.session?.user;
  let user;

  // if user not found, create new user
  if (!user) {
    user = new User();
    user.username = username;
    user.isTa = false; // TAs are added directly from csv

    // save user
  }

  res.status(200).json({ username: username, isTa: user.isTa });
  return;
};

export const signOut = async (req: Request, res: Response) => {
  await new Promise<void>((resolve, reject) =>
    req.session.destroy((err: any) => {
      if (err) {
        console.error("Error signing out:", err.message);
        reject(err);
      } else {
        resolve();
      }
    }),
  ).catch(() => {
    res
      .status(500)
      .json({ message: "There was an error signing the user out." });
    return;
  });

  res.status(204).json({ message: "User has been signed out." });
  return;
};
