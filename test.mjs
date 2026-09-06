#!/usr/bin/env node
import g2mm from './index.mjs';
import { expect } from 'expect';

const genius = `[Songtext zu ...nein]

[Part]
This is a part,
oh ja!

[Bridge: Mister Häfftling]
My life is nice:
Swag!

[Hook: chrissx]
trap

[Verse 2]
hello
[häffti]
 hi  too `;

const musixmatch = `#VERSE
This is a part
Oh ja!

#BRIDGE
My life is nice
Swag!

#HOOK
Trap

#VERSE
Hello
Hi too`;

const plain = `This is a part
Oh ja!

My life is nice
Swag!

Trap

Hello
Hi too`;

expect(g2mm(genius)).toBe(musixmatch);
expect(g2mm(genius, "plain")).toBe(plain);

expect(g2mm("a\r\nb\r\nc", "genius")).toBe("a\nb\nc");
expect(g2mm("I love this chorus [chorus reprise]\nhello")).toBe("I love this chorus [chorus reprise]\nHello");
expect(g2mm("[Chorus]\nhello")).toBe("#CHORUS\nHello");
expect(g2mm("[Instrumental]\n")).toBe(g2mm("[Instrumental]"));

expect(g2mm(`[Verse]\nhello\n\n[Pre-Chorus]\npre lyrics\n\n[Chorus]\nchorus lyrics`)).toBe(`#VERSE\nHello\n\n#PRE-CHORUS\nPre lyrics\n\n#CHORUS\nChorus lyrics`);
expect(g2mm(`[Verse]\nhello\n\n[Pre-Chorus]\npre lyrics\n\n[Chorus]\nchorus lyrics`, "plain")).toBe(`Hello\n\nPre lyrics\n\nChorus lyrics`);
expect(g2mm(`[Refrain]\nfirst\n\n[Post-Chorus]\nsecond\n\n[Breakdown]\nthird\n\n[Interlude]\nfourth`)).toBe(`#CHORUS\nFirst\n\n#CHORUS\nSecond\n\n#BRIDGE\nThird\n\n#BRIDGE\nFourth`);
expect(g2mm(`[Skit: Dave]\nYo, pass me keys`)).toBe(`Yo, pass me keys`);

expect(g2mm(`[Verse 1]\nhello\n\n[Instrumental]\n\n[Chorus]\nworld`)).toBe(`#VERSE\nHello\n\n#INSTRUMENTAL\n\n#CHORUS\nWorld`);
expect(g2mm(`[Verse 1]\nhello\n\n[Instrumental]\n\n[Chorus]\nworld`, "plain")).toBe(`Hello\n\nWorld`);
expect(g2mm(`[Instrumental]\nhello`)).toBe(`Hello`);
expect(g2mm(`hello\n\n[Instrumental]`)).toBe(`Hello`);
expect(g2mm("[Instrumental]\n")).not.toBe("");

expect(g2mm(`hello [?]\nhe [?] llo\n[?]\nworld`, "genius")).toBe(`hello [?]\nhe [?] llo\n[?]\nworld`);
expect(g2mm(`hello [?]\nhe [?] llo\n[?]\nworld`)).toBe(`Hello\nHe llo\nWorld`);
expect(g2mm(`hello [?]\nhe [?] llo\n[?]\nworld`, "plain")).toBe(`Hello\nHe llo\nWorld`);
expect(g2mm(`hello [?]`)).toBe(`Hello`);

expect(g2mm(`[Chorus]\n<i>I'll be there</i>\n<b>We gon' ride</b>`)).toBe(`#CHORUS\nI'll be there\nWe gon' ride`);
expect(g2mm(`[Chorus]\n<i>I'll be there</i>\n<b>We gon' ride</b>`, "plain")).toBe(`I'll be there\nWe gon' ride`);

expect(g2mm(`[Verse]\nHello\n*phone ringing*\nWorld`)).toBe(`#VERSE\nHello\nWorld`);
expect(g2mm(`[Verse]\nHello\n*phone ringing*\nWorld`, "plain")).toBe(`Hello\nWorld`);
expect(g2mm(`[Verse]\nHello\n*phone ringing*\nWorld`, "genius")).toBe(`[Verse]\nHello\n*phone ringing*\nWorld`);

expect(g2mm(`[Verse]\nHold on (Yeah)\nStay with me (I)\nOh no (oh! Yeah)`)).toBe(`#VERSE\nHold on (yeah)\nStay with me (I)\nOh no (oh! Yeah)`);
expect(g2mm(`[Verse]\nHold on (Yeah)`, "plain")).toBe(`Hold on (Yeah)`);

expect(g2mm(`[Verse]\nI'm the f*** man`)).toBe(`#VERSE\nI'm the f- man`);
expect(g2mm(`[Verse]\nI'm the f*** man`, "plain")).toBe(`I'm the **** man`);

expect(g2mm(`[Verse]\nhello,\nworld.\nhow are you? i am fine\nwow! so cool`)).toBe(`#VERSE\nHello\nWorld\nHow are you? I am fine\nWow! So cool`);
expect(g2mm(`[Verse]\nhello,\nworld.`, "plain")).toBe(`Hello\nWorld`);
expect(g2mm(`[Verse]\nborn in the U.S.A.`)).toBe(`#VERSE\nBorn in the U.S.A.`);

const longVerse = `[Verse 1]\n` + Array.from({ length: 12 }, (_, i) => `Line${i + 1}`).join("\n");
expect(g2mm(longVerse)).toBe(`#VERSE\n` + Array.from({ length: 10 }, (_, i) => `Line${i + 1}`).join("\n") + `\n\n#VERSE\nLine11\nLine12`);
const tenVerse = `[Verse 1]\n` + Array.from({ length: 10 }, (_, i) => `Line${i + 1}`).join("\n");
expect(g2mm(tenVerse)).toBe(`#VERSE\n` + Array.from({ length: 10 }, (_, i) => `Line${i + 1}`).join("\n"));

expect(g2mm(`[Verse 1]\nhello\n\n[Skit: Dave]\nYo, pass me keys\n\n[Chorus]\ntrap`, "plain")).toBe(`Hello\n\nTrap`);
expect(g2mm(`[Verse 1]\nhello\n\n[Skit: Dave]\nYo, pass me keys\n\n[Chorus]\ntrap`)).toBe(`#VERSE\nHello\n\nYo, pass me keys\n\n#CHORUS\nTrap`);
