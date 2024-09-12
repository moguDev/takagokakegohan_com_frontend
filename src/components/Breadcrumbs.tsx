import Link from "next/link";

export const Breadcrumbs = () => {
  return (
    <div className="breadcrumbs text-sm px-5 pb-5">
      <ul>
        <li>
          <Link href="/" className="text-sm flex-items-center">
            <span className="material-icons" style={{ fontSize: "14px" }}>
              homeトップ
            </span>
          </Link>
        </li>
        <li>
          <a>Documents</a>
        </li>
        <li>Add Document</li>
      </ul>
    </div>
  );
};
