import Link from "next/link";
import logo from "/public/images/tkg_logo.png";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="fixed top-0 h-16 w-full md:px-5 px-2 py-2 font-Zen_Kaku_Gothic_New bg-white bg-opacity-40 z-50">
      <div className="flex items-center justify-between h-full">
        <div className="text-black md:text-2xl text-xl font-black flex items-center">
          <Image
            src={logo}
            alt="logo"
            className="md:h-12 md:w-12 h-10 w-10 object-cover"
          />
          たまごかけごはん
          <span className="text-xl font-semibold">.com</span>
        </div>
        {/* md以上で表示 */}
        <div className="items-center md:flex hidden">
          <form>
            <div className="flex items-center border border-gray-200 rounded-lg p-2 bg-white w-96">
              <span className="material-icons opacity-20 pr-1">search</span>
              <input
                type="text"
                className="outline-none w-full"
                placeholder="たまごかけごはんを探す"
              />
            </div>
          </form>
          <Link
            href="#"
            className={`
              flex items-center mx-2 font-semibold bg-yellow-600 text-white px-4 py-2 rounded
              transition-all duration-200
              hover:shadow-xl hover:bg-yellow-700 active:shadow-none`}
          >
            <span className="material-icons text-sm pr-1">egg_alt</span>
            レシピを投稿する
          </Link>
        </div>
        <div className="md:hidden flex items-center h-full">
          <span className="material-icons m-2">search</span>
          <span className="material-icons m-2">menu</span>
        </div>
      </div>
    </header>
  );
};
