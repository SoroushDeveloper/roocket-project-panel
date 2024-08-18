import {NextPageWithLayout} from "@/pages/_app";
import UserPanelLayout from "@/app/components/userPanelLayout";
import UserInfo from "@/app/components/panel/userInfo";

const Panel: NextPageWithLayout = () => {
    return (
        <div>
            <h1>
                <UserInfo/>
            </h1>
        </div>
    )
}

Panel.getLayout = (page) => <UserPanelLayout>{page}</UserPanelLayout>

export default Panel