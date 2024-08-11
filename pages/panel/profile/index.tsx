import {NextPageWithLayout} from "@/pages/_app";
import UserPanelLayout from "@/app/components/userPanelLayout";

const Profile: NextPageWithLayout = () => {
    return (
        <div>
            <h1>
                Profile
            </h1>
        </div>
    )
}

Profile.getLayout = (page) => <UserPanelLayout>{page}</UserPanelLayout>

export default Profile