import {NextPageWithLayout} from "@/pages/_app";
import UserPanelLayout from "@/app/components/userPanelLayout";

const Articles: NextPageWithLayout = () => {
    return (
        <div>
            <h1>
                Articles
            </h1>
        </div>
    )
}

Articles.getLayout = (page) => <UserPanelLayout>{page}</UserPanelLayout>

export default Articles