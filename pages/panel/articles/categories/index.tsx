import {NextPageWithLayout} from "@/pages/_app";
import UserInfo from "@/app/components/panel/userInfo";
import UserPanelLayout from "@/app/components/userPanelLayout";

const Articles: NextPageWithLayout = () => {
    return (
        <div>
            <h1>
                Article Categories
            </h1>
        </div>
    )
}

Articles.getLayout = (page) => <UserPanelLayout>{page}</UserPanelLayout>

export default Articles