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
        const isBullet = /^[•●\-*]/.test(trimmed);

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
  const isNumbered = /^\d+\./.test(content);
  const isBullet = /^[•●\-*]/.test(content);
  const emojiRex =
    /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g;
  const hasEmoji = emojiRex.test(content);
  const isEmpty = !content.trim();
  return {
    isNumbered,
    isBullet,
    hasEmoji,
    isEmpty,
  };
};

export { parseSection, parseContent };
