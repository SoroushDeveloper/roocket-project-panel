import {NextPageWithLayout} from "@/pages/_app";
import UserPanelLayout from "@/app/components/userPanelLayout";
import Index from "@/app/components/panel";

const Panel: NextPageWithLayout = () => {
    return (
        <div>
            <h1>
                <Index/>
            </h1>
        </div>
    )
}

Panel.getLayout = (page) => <UserPanelLayout>{page}</UserPanelLayout>

export default Panel