type Props = { content: string[] };

const ContentSection = ({ content }: Props) => {
  return (
    <div className="lg:px- mx-auto space-y-4 px-4 py-4 sm:px-6">
      {content.map((content, index) => {
        return (
          <p
            key={`point-${index}`}
            className="group to relative rounded-2xl border border-gray-100/10 bg-gray-300 bg-linear-to-br from-gray-200 p-4 transition-all hover:shadow-lg"
          >
            {content.replaceAll("●", "")}
          </p>
        );
      })}
    </div>
  );
};

export default ContentSection;
