import ProfileTabs from "./ProfileTabs";
import UserProfileCard from "./UserProfileCard";

export default function ProfileCard() {
  return (
    <div className="flex flex-col align-middle items-center">
      <div className="flex flex-col align-middle items-center w-full">
        <UserProfileCard />
      </div>
      <div className="flex mt-7 mb-6 rounded-b-xl w-3/4 bg-opacity-95">
        <div className="w-full bg-white">
          <ProfileTabs />
        </div>
      </div>
    </div>
  );
}
