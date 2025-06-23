import { MotionDiv } from "@/components/shared/motion-wrapper";
import { containerVariants, itemVariants } from "@/lib/constant";
import { parseContent, parseEmojiPoint } from "@/utils/summary-helper";

type Props = { content: string[] };

const ContentSection = ({ content }: Props) => {
  return (
    <MotionDiv
      variants={containerVariants}
      key={content.join("")}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="mx-auto space-y-4 px-4 py-4 sm:px-6"
    >
      {content.map((line, index) => {
        const { isBullet, hasEmoji, isEmpty } = parseContent(line);
        if (isEmpty) return null;

        const emojiPoint = parseEmojiPoint(line);

        if ((hasEmoji || isBullet) && emojiPoint) {
          const { emoji, text } = emojiPoint;
          return (
            <MotionDiv
              variants={itemVariants}
              key={`point-${index}`}
              className="group relative rounded-2xl border border-gray-100/10 bg-gray-300 bg-linear-to-br from-gray-200 p-4 transition-all hover:shadow-lg"
            >
              <div className="absolute inset-0 rounded-2xl border border-gray-100/10 bg-gray-300 bg-linear-to-br from-gray-200 p-4 transition-all group-hover:shadow-lg" />
              <div className="relative flex items-start gap-3">
                <span className="text-xl">{emoji}</span>
                <p className="text-muted-foreground text-lg leading-relaxed lg:text-xl">
                  {text}
                </p>
              </div>
            </MotionDiv>
          );
        }

        return (
          <MotionDiv
            variants={itemVariants}
            key={`point-${index}`}
            className="group relative rounded-2xl border border-gray-100/10 bg-gray-300 bg-linear-to-br from-gray-200 p-4 transition-all hover:shadow-lg"
          >
            <div className="absolute inset-0 rounded-2xl border border-gray-100/10 bg-gray-300 bg-linear-to-br from-gray-200 p-4 transition-all group-hover:shadow-lg" />
            <p className="text-muted-foreground text-lg leading-relaxed lg:text-xl">
              {emojiPoint.text}
            </p>
          </MotionDiv>
        );
      })}
    </MotionDiv>
  );
};

export default ContentSection;
