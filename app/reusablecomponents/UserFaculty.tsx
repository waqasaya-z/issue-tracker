"use client";
import { useState } from "react";
import adminSvg from "@/public/admin-icon.svg";
import Modal from "./Modal";
import Image from "next/image";
import { MdOutlineAdminPanelSettings } from "react-icons/md";


const UserFaculty = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const closeFunction = () => {
    setModalVisible(false);
    console.log(modalVisible);
  };

  return (
    <div
      onClick={() => setModalVisible(true)}
      className="box-border border border-gray-500 p-2 w-1/2 md:w-1/2 rounded-xl hover:cursor-pointer hover:border-2 hover:border-black shadow-md transition duration-200 ease-in-out"
    >
      {/* <Image src={adminSvg} alt="Teacher svg" className="w-32 mx-auto" /> */}
      <MdOutlineAdminPanelSettings className="mx-auto h-40 w-44 text-gray-800" />
      <div className="p-4">
        <p className="text-3xl font-medium text-center text-gray-800">Admin</p>
        <p className="text-sm text-gray-600 text-center"> For the Worthy... </p>
      </div>
      <Modal onClose={closeFunction} visible={modalVisible} />
    </div>
  );
};

export default UserFaculty;
