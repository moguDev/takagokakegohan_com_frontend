export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-gray-400">
      <span className="loading loading-ball loading-lg text-yellow-600" />
      <p className="text-xs font-then pt-2">読み込み中...</p>
    </div>
  );
}
