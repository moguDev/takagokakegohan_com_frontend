type CardProps = { title: string };

export const Card = (props: CardProps) => {
  return (
    <figure>
      <div className="bg-white border border-gray-100 rounded-lg shadow cursor-pointer hover:shadow-lg transition-all duration-300 active:shadow">
        <div className="bg-gray-50 flex items-center justify-center h-52 w-full rounded-t-lg overflow-hidden">
          <span className="material-icons text-gray-300 select-none">
            image
          </span>
        </div>
        <p className="px-2 py-4 select-none font-bold">{props.title}</p>
      </div>
    </figure>
  );
};
