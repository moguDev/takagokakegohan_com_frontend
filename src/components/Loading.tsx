export const Loading = ({
  text,
  loading,
}: {
  text: string;
  loading: boolean;
}) => {
  if (!loading) return <></>;
  return (
    <div className="absolute flex flex-col items-center justify-center h-full w-full bg-white bg-opacity-70 z-20">
      <span className="loading loading-ball loading-lg text-yellow-600" />
      <p className="text-gray-500 text-xs">{text}</p>
    </div>
  );
};
