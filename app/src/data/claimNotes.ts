/*
  Corrections for verbatim copy that is not true yet.

  content.ts is verbatim (README rule 3), and two of its lines promise
  encryption: the health consent toggle ("Encrypted · revocable anytime · never
  sold") and a membership feature ("Encrypted Medical Vault"). Nothing in this
  app is encrypted. Records sit in the browser's storage, readable by anyone
  holding the unlocked phone.

  Editing the verbatim line would break the rule; leaving it alone would leave
  a false promise on the one kind of screen where that matters most. So the
  line stays and a correction is rendered beside it, wherever it is shown.
  Decided with the project owner - see DISCREPANCIES, "the encryption promise".

  `npm run promises` fails on any encryption claim in the source that is not
  either marked as planned / not yet true, or acknowledged there as corrected
  by this note.
*/

export const NOT_ENCRYPTED_NOTE =
  'Not true yet: nothing is encrypted. It is stored in this browser, and anyone who can open this phone unlocked can read it.';

/** The correction to show beside a line of copy, or null when none is needed. */
export function claimNote(text: string | undefined): string | null {
  return text && /\bencrypt/i.test(text) ? NOT_ENCRYPTED_NOTE : null;
}
