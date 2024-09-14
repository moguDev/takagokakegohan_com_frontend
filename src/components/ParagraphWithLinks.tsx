// URLをリンクに変換する関数
const linkify = (text: string) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g; // URLパターンの正規表現
  return text.split(urlPattern).map((part, index) => {
    // URLにマッチする部分を <a> タグにする
    if (urlPattern.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {part}
        </a>
      );
    }
    // マッチしない部分はそのまま表示
    return part;
  });
};

export const ParagraphWithLinks = ({ text }: { text: string }) => {
  if (text === null) return <></>;
  return <p>{linkify(text)}</p>;
};
