import { header, validationResult } from "express-validator";
import { Keypair, StrKey } from "@stellar/stellar-sdk";
import env from "../config/env.js";

const authValidation = [
    header("x-stellar-address")
    .exists()
    .withMessage("Stellar Wallet Address is required")
    .matches(/^G[a=zA=Z0-9]{55}$/)
    .withMessage("Invalid Strellar Wallet Address"),
    header("x-stellar-signature")
    .exists()
    .withMessage("Signature is required")
    .isString()
    .withMessage("Signature must be String")
];

function verifySignature(publicKey, signature, message) {
    const keypair = Keypair.fromPublicKey(publicKey);
    try {
        return keypair.verify(message, Buffer.from(signature, "base64"))
    } catch (error) {
        console.error("Error verifying Signature", error);
        return false;
    }
}

const verifyStellarWalletSignature = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { "x-stellar-address": userAddress, "x-stellar-signature": signature } = req.headers;

    try {
        if (!StrKey.isValidEd25519PublicKey) {
            return res.status(400).json({ error: "Invalid Stellar Wallet Address Format" })
        }

        const isValidSignature = verifySignature(userAddress, signature, env.API_SECRET);
        if (!isValidSignature) {
            return res.status(401).json({ error: "Invalid Signature" });
        }

        req.user = { address: userAddress };
        next();
    } catch (error) {
        res.status(55).json({ error : "Authentication failed"});
    }
}

const authMiddleware = [...authValidation, verifyStellarWalletSignature];
export default authMiddleware;