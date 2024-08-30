export const EditProfileModal = () => {
  return (
    <div>
      <input type="checkbox" id="edit-profile-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white rounded shadow-xl">
          <div className="flex items-center justify-between pb-5">
            <div className="flex items-center">
              <label
                htmlFor="edit-profile-modal"
                className="material-icons mr-1"
              >
                close
              </label>
              <h3 className="font-bold text-xl text-yellow-950">
                プロフィールの編集
              </h3>
            </div>
            <label
              htmlFor="edit-profile-modal"
              className="bg-yellow-700 text-white py-1 px-3 rounded text-sm my-btn"
            >
              保存
            </label>
          </div>
          <form>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-xs my-1">
                アカウント名<span className="text-red-500">【必須】</span>
              </label>
              <input
                type="text"
                className="my-1 p-1 border-b border-black outline-none"
                placeholder="アカウント名"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-xs my-1">
                自己紹介
              </label>
              <input
                type="text"
                className="my-1 p-1 border-b border-black outline-none"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
