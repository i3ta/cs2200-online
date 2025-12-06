import {
  authCallback,
  authRedirect,
  getLoginUrl,
  getUser,
  signOut,
} from "@/api/auth/auth.handlers";
import { Router } from "express";

const router = Router();

/**
 * Initiates the CAS authentication flow by redirecting to Georgia Tech's login page.
 */
router.get("/", authRedirect);

/**
 * Frontend calls this to get the CAS login URL.
 * Stores any returnUrl in session so callback can redirect back.
 */
router.get("/login-url", getLoginUrl);

/**
 * Handles the CAS callback after user authentication.
 * Validates the ticket received from CAS and creates a user session if valid.
 */
router.get("/callback", authCallback);

/**
 * Check authentication status and retrieve username.
 */
router.get("/user", getUser);

/**
 * Sign user out.
 */
router.delete("/", signOut);

export default router;
