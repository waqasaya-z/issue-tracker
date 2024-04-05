import UserFaculty from "./UserFaculty"
import UserStudent from "./UserStudent"

const UserTypeSelection = () => {
  return (
    <div className="box-border border-2 border-gray-800 w-full sm:w-3/4 h-3/4 flex flex-col items-center justify-center gap-16 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 ease-in-out">
        <h1 className="text-3xl text-gray-800 font-bold text-center">Learning Spells or Building Hogwarts? </h1>
        <div className="w-full sm:w-3/4 flex flex-col sm:flex-row justify-center items-center gap-12 md:gap-24">
            <UserStudent/>
            <UserFaculty/>
        </div>
    </div>
  )
}

export default UserTypeSelection