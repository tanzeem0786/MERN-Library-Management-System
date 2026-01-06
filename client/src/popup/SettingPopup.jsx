import React, { useEffect, useState } from 'react'
import closeIcon from "../assets/close-square.png";
import settingIcon from "../assets/setting.png";
import { useDispatch, useSelector } from 'react-redux';
import { resetAuthSlice, updatePassword } from '../store/slices/authSlice.js';
import { toggleSettingPopup } from '../store/slices/popupSlice.js';
import { toast } from 'react-toastify';

const SettingPopup = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.auth);

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("currentPassword", currentPassword);
    data.append("newPassword", newPassword);
    data.append("confirmNewPassword", confirmNewPassword);
    dispatch(updatePassword(data));
  };
  useEffect(() => {
    if (error) {
      // toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [loading, message, error]);

  return <>
    <div className="fixed inset-0 bg-black opacity-95 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg opacity-100 shadow-lg sm:w-auto lg:w-1/2 2xl:w-1/3">
        <div className="p-6">
          <header className="flex justify-between items-center mb-7 pb-5 border-b border-black ">
            <div className="flex items-center gap-3">
              <img src={settingIcon} alt="settingIcon" className="bg-gray-300 p-3 rounded-lg" />

              <h3 className="text-xl font-bold">UPDATE PASSWORD</h3>
            </div>
            <img src={closeIcon} alt="close Icon" onClick={() => dispatch(toggleSettingPopup())} className="cursor-pointer" />
          </header>
          <form onSubmit={handleUpdatePassword}>

            <div className="mb-4 flex  gap-1 mt-10">
              <label className="block text-gray-1000 font-medium w-full">Current Password</label>
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password" className="w-full px-4 py-2 border border-gray-500 rounded-md " />
            </div>
            <div className="mb-4 flex  gap-1 mt-10">
              <label className="block text-gray-1000 font-medium w-full">New Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password" className="w-full px-4 py-2 border border-gray-500 rounded-md " />
            </div>
            <div className="mb-4 flex  gap-1 mt-10" flex gap-1 mt-10>
              <label className="block text-gray-1000 font-medium w-full">Confirm New Password</label>
              <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm New Password" className="w-full px-4 py-2 border border-gray-500 rounded-md " />
            </div>
            {/* Button */}
            <div className="flex justify-end space-x-4">
              <div className="flex gap-4 mt-10">
                <button type="button" onClick={() => dispatch(toggleSettingPopup())} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-sm">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-gray-900 text-white cursor-pointer rounded-sm">CONFIRM</button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  </>;
}

export default SettingPopup;