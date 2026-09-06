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
      .replace(/^[ \t]*\[\?\][ \t]*\n?/gm, "")
      .replace(/ ?\[\?\]/g, "")
      .replace(/<\/?[ib][^>]*>/gi, "")
      .replace(/^\*[^*\n]+\*\s*\n?/gm, "")
      .replace(/\(([A-Z])/g, (m, c) => "(" + (c === "I" ? c : c.toLowerCase()))
      .replace(/\b(\w)\*+/g, "$1-")
      .replace(/[,;:]+$|(?<!\w\.\w)\.+$/gm, "")
      .replace(/(^|[?!]\s+)(\w)/gm, (_, p, c) => p + c.toUpperCase())
      .replace(/^\[.*\]\n?/gm, "")
      .replace(/\n\n+/g, "\n\n")
      .replace(/^(#INSTRUMENTAL\n*)+/g, "")
      .replace(/(\n*#INSTRUMENTAL)+$/g, "")
      .trim().split("\n\n").map(s => {
        const l = s.split("\n");
        if (!/^#/.test(l[0]) || l.length <= 11) return s;
        const out = [];
        for (let i = 1; i < l.length; i += 10) out.push(l[0] + "\n" + l.slice(i, i + 10).join("\n"));
        return out.join("\n\n");
      }).join("\n\n") || (/instrumental/i.test(raw) ? "[Instrumental]" : "");
  } else if (style === "plain") {
    return raw
      .replace(/^\[skit[^\]]*\]\n(?:(?!^\[)[\s\S])*/gim, "")
      .replace(/^[ \t]*\[\?\][ \t]*\n?/gm, "")
      .replace(/ ?\[\?\]/g, "")
      .replace(/<\/?[ib][^>]*>/gi, "")
      .replace(/^\*[^*\n]+\*\s*\n?/gm, "")
      .replace(/\b\w*\*+\w*/g, "****")
      .replace(/[,;:]+$|(?<!\w\.\w)\.+$/gm, "")
      .replace(/(^|[?!]\s+)(\w)/gm, (_, p, c) => p + c.toUpperCase())
      .replace(/^\[.*\]\n?/gm, "")
      .replace(/\n\n+/g, "\n\n").trim();
  } else {
    throw "not implemented (invalid style)";
  }
}

export default g2mm;
