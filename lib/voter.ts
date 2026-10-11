
import "server-only";

import { cookies } from "next/headers";
import {
  createHmac,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";

const COOKIE_NAME = "lifestyle_voter";
const MAX_AGE = 60 * 60 * 24 * 365;

function getSecret() {
  const secret = process.env.VOTER_COOKIE_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("Invalid VOTER_COOKIE_SECRET");
  }

  return secret;
}

function sign(id: string) {
  return createHmac("sha256", getSecret())
    .update(id)
    .digest("hex");
}

function verifyCookie(value?: string) {
  if (!value) return null;

  const parts = value.split(".");
  if (parts.length !== 2) return null;

  const [id, signature] = parts;

  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id) ||
    !/^[0-9a-f]{64}$/.test(signature)
  ) {
    return null;
  }

  const expected = Buffer.from(sign(id), "hex");
  const received = Buffer.from(signature, "hex");

  return timingSafeEqual(expected, received)
    ? id
    : null;
}

export async function getVoterId() {
  const cookieStore = await cookies();

  return verifyCookie(
    cookieStore.get(COOKIE_NAME)?.value
  );
}

export async function getOrCreateVoterId() {
  const existingId = await getVoterId();

  if (existingId) return existingId;

  const id = randomUUID();

  const cookieStore = await cookies();

  cookieStore.set(
    COOKIE_NAME,
    `${id}.${sign(id)}`,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: MAX_AGE,
    }
  );

  return id;
}
