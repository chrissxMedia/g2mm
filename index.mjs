export function g2mm(raw, style = "musixmatch") {
  if (!raw) return raw;
  raw = raw
    .replace(/\r\n?/g, "\n")
    .replace(/ +/g, " ")
    .replace(/\n /g, "\n")
    .replace(/ $/, "");
  if (style === "genius") {
    return raw.replace(/\n\n+/g, "\n\n").trim();
  } else if (style === "musixmatch") {
    // TODO: capitalization
    // TODO: remove punctuation at end of line but not ! and ?
    // TODO: consider processing line-by-line
    return raw
      .replace(/^\[pre-chorus.*\]$/gmi, "#PRE-CHORUS")
      .replace(/^\[(refrain|post-chorus).*\]$/gmi, "#CHORUS")
      .replace(/^\[(breakdown|interlude).*\]$/gmi, "#BRIDGE")
      .replace(/^\[instrumental[^\]]*\]$/gmi, "#INSTRUMENTAL")
      .replace(/^\[([pP][aA][rR][tT]|[vV][eE][rR][sS]).*\]$/gm, "#VERSE")
      .replace(/^\[[bB][rR][iI][dD][gG][eE].*\]$/gm, "#BRIDGE")
      .replace(/^\[[hH][oO][oO][kK].*\]$/gm, "#HOOK")
      .replace(/^\[[cC][hH][oO][rR][uU][sS].*\]$/gm, "#CHORUS")
      .replace(/^\[[iI][nN][tT][rR][oO].*\]$/gm, "#INTRO")
      .replace(/^\[[oO][uU][tT][rR][oO].*\]$/gm, "#OUTRO")
      .replace(/^\[.*\]\n?/gm, "")
      .replace(/\n\n+/g, "\n\n")
      .replace(/^(#INSTRUMENTAL\n*)+/g, "")
      .replace(/(\n*#INSTRUMENTAL)+$/g, "")
      .trim() || (/instrumental/i.test(raw) ? "[Instrumental]" : "");
  } else if (style === "plain") {
    return raw
      .replace(/^\[.*\]\n?/gm, "")
      .replace(/\n\n+/g, "\n\n").trim();
  } else {
    throw "not implemented (invalid style)";
  }
}

export default g2mm;
