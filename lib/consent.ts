import { useSyncExternalStore } from "react";

// Cookie consent, kept in the visitor's own browser (localStorage) — nothing is sent
// anywhere. The site itself sets no cookies; consent only gates third-party embeds
// (Google Maps, the Curator.io Instagram feed) that would set their own.

export type Consent = { media: boolean; decidedAt: string };

const KEY = "dredent-consent-v1";
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

const listeners = new Set<() => void>();
let dialogRequested = false;

function emit() {
  listeners.forEach((listener) => listener());
}

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function parse(raw: string | null): Consent | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<Consent>;
    if (typeof value.media !== "boolean" || typeof value.decidedAt !== "string") return null;
    if (Date.now() - new Date(value.decidedAt).getTime() > MAX_AGE_MS) return null;
    return { media: value.media, decidedAt: value.decidedAt };
  } catch {
    return null;
  }
}

export function writeConsent(media: boolean) {
  const value: Consent = { media, decidedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // Storage blocked (private mode, disabled): the choice just isn't remembered.
  }
  dialogRequested = false;
  emit();
}

/** Re-open the banner so the visitor can change an earlier choice. */
export function openConsentDialog() {
  dialogRequested = true;
  emit();
}

export function closeConsentDialog() {
  dialogRequested = false;
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export type ConsentState = {
  // false until the first client render, so server and client markup agree.
  ready: boolean;
  consent: Consent | null;
  dialogOpen: boolean;
};

const SERVER_STATE: ConsentState = { ready: false, consent: null, dialogOpen: false };

// useSyncExternalStore needs a referentially stable snapshot while nothing changed.
let snapshot: ConsentState = SERVER_STATE;
let snapshotKey = "";

function getSnapshot(): ConsentState {
  const raw = readRaw();
  const key = `${raw ?? ""}|${dialogRequested}`;
  if (key !== snapshotKey) {
    snapshotKey = key;
    snapshot = { ready: true, consent: parse(raw), dialogOpen: dialogRequested };
  }
  return snapshot;
}

export function useConsentState(): ConsentState {
  return useSyncExternalStore(subscribe, getSnapshot, () => SERVER_STATE);
}
