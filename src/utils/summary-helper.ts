import { parseSummaryTS } from "@/types";

const parseSection = (summary: string) => {
  const sections: Array<parseSummaryTS> = summary
    .replace(/^```markdown\s*|```$/g, "") // Remove code block
    .split(/\n(?=#)/) // Split on newlines before headers (#, ##, etc.)
    .map((rawSection) => rawSection.trim())
    .filter(Boolean)
    .map((section) => {
      const lines = section.split("\n").filter(Boolean);
      const titleLine = lines.shift() || "Untitled";
      const title = titleLine.replace(/^#+/, "").trim();
      const points: string[] = [];
      let currentPoint = "";

      for (const line of lines) {
        const trimmed = line.trim();
        const isBullet = /^[•●\-\*\s]+/.test(trimmed);

        if (isBullet) {
          if (currentPoint) {
            points.push(currentPoint.trim());
          }
          currentPoint = trimmed;
        } else if (trimmed === "") {
          if (currentPoint) {
            points.push(currentPoint.trim());
            currentPoint = "";
          }
        } else {
          currentPoint += " " + trimmed;
        }
      }

      if (currentPoint) points.push(currentPoint.trim());

      return {
        title,
        content: points.filter(
          (point) => !point.startsWith("#") && !point.startsWith("[Choose]")
        ),
      };
    });
  return sections;
};

const parseContent = (content: string) => {
  const isNumbered = /^\d+\,/gi.test(content);
  const isBullet = /^[•●\-\*\s]+/gi.test(content);
  const emojiRex =
    /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>●?@[\]^`{|}~]/g;
  const hasEmoji = emojiRex.test(content);
  const isEmpty = !content.trim();
  return {
    isNumbered,
    isBullet,
    hasEmoji,
    isEmpty,
  };
};
const parseEmojiPoint = (content: string) => {
  // Remove leading bullet or emoji
  const cleanContent = content.replace(/^[•●\-\*\s]+/, "").trim();

  // Check for emoji at the start
  const emojiMatch = cleanContent.match(
    /^([\p{Emoji_Presentation}\p{Extended_Pictographic}])\s+(.*)$/u
  );

  if (emojiMatch) {
    const [, emoji, text] = emojiMatch;
    return {
      emoji: emoji.trim(),
      text: text.trim(),
    };
  }

  // If no emoji, treat as regular bullet point
  return {
    text: cleanContent,
  };
};

export { parseSection, parseContent, parseEmojiPoint };
