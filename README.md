# `g2mm`

A library and tool for converting lyrics from Genius style to Musixmatch and
Plain (i.e. Apple Music) styles.

## The tool

The `g2mm` tool reads your Genius style lyrics from `stdin` and
writes them re-formatted in Musixmatch/Plain style to `stdout`, like this:

```sh
npx g2mm < my_genius_lyrics.txt > my_musixmatch_lyrics.txt
npx g2mm --plain < my_genius_lyrics.txt > my_musixmatch_lyrics.txt
```

## The library

There is only one function, `g2mm`:

```js
import g2mm from "g2mm";

const my_musixmatch_lyrics = g2mm(my_genius_lyrics);
const my_plain_lyrics = g2mm(my_genius_lyrics, "plain");
```
