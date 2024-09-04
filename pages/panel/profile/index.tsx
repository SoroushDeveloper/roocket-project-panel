import {NextPageWithLayout} from "@/pages/_app";
import UserPanelLayout from "@/app/components/userPanelLayout";
import Hr from "@/app/components/shared/hr";
import {useAppSelector} from "@/app/hooks";
import {selectUser} from "@/app/store/auth";
import ProfileForm from "@/app/forms/panel/profileForm";

const Profile: NextPageWithLayout = () => {
    const user = useAppSelector(selectUser);
    return (
        <div>
            <h1 className="text-4xl">
                Profile
            </h1>
            <Hr my={true}/>
            <ProfileForm name={user ?? ''}/>
        </div>
    )
}

Profile.getLayout = (page) => <UserPanelLayout>{page}</UserPanelLayout>

export default Profile