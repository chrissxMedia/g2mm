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
This is a part,
oh ja!

#BRIDGE
My life is nice:
Swag!

#HOOK
trap

#VERSE
hello
hi too`;

const plain = `This is a part,
oh ja!

My life is nice:
Swag!

trap

hello
hi too`;

expect(g2mm(genius)).toBe(musixmatch);
expect(g2mm(genius, "plain")).toBe(plain);

expect(g2mm("a\r\nb\r\nc", "genius")).toBe("a\nb\nc");
expect(g2mm("I love this chorus [chorus reprise]\nhello")).toBe("I love this chorus [chorus reprise]\nhello");
expect(g2mm("[Chorus]\nhello")).toBe("#CHORUS\nhello");
expect(g2mm("[Instrumental]\n")).toBe(g2mm("[Instrumental]"));

expect(g2mm(`[Verse]\nhello\n\n[Pre-Chorus]\npre lyrics\n\n[Chorus]\nchorus lyrics`)).toBe(`#VERSE\nhello\n\n#PRE-CHORUS\npre lyrics\n\n#CHORUS\nchorus lyrics`);
expect(g2mm(`[Verse]\nhello\n\n[Pre-Chorus]\npre lyrics\n\n[Chorus]\nchorus lyrics`, "plain")).toBe(`hello\n\npre lyrics\n\nchorus lyrics`);
expect(g2mm(`[Refrain]\na\n\n[Post-Chorus]\nb\n\n[Breakdown]\nc\n\n[Interlude]\nd`)).toBe(`#CHORUS\na\n\n#CHORUS\nb\n\n#BRIDGE\nc\n\n#BRIDGE\nd`);
expect(g2mm(`[Skit: Dave]\nYo, pass me keys`)).toBe(`Yo, pass me keys`);
