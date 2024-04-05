import userSvg from "@/public/user-stroke.svg";
import Image from "next/image";
import Link from "next/link";
import { LuUser2 } from "react-icons/lu";



const UserStudent = () => {
  return (
    <div className="box-border border border-gray-500 p-2 w-1/2 md:w-1/2 rounded-xl hover:cursor-pointer hover:border-2 hover:border-black  shadow-md transition duration-300 ease-in-out">
      <Link href="/api/auth/signin">
        {/* <Image src={userSvg} alt="Student svg" className="w-32  mx-auto" /> */}
        <LuUser2 className="mx-auto h-40 w-44 text-gray-800" />
        <div className="p-4">
          <p className="text-3xl text-gray-800 font-medium text-center">User</p>
          <p className="text-sm text-gray-600 text-center">
            {" "}
            Muggles Click Here{" "}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default UserStudent;
