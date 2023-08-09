import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import CounselorEducation from "./CounselorEducation";
import ChangePassword from "./ChangePassword";
import CounselorExperience from "./CounselorExperience";

export default function CounselorTabs() {
    const data = [
        {
            label: "Education",
            value: "education",
            desc: <CounselorEducation/>,
        },

        {
            label: "Experience",
            value: "experience",
            desc: <CounselorExperience/>,
        },

        {
            label: "Change Password",
            value: "password",
            desc: <ChangePassword/>,
        }
    ];

    return (
        <Tabs id="custom-animation" value="headers">
            <TabsHeader>
                {data.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody
                animate={{
                    initial: { y: 250 },
                    mount: { y: 0 },
                    unmount: { y: 250 },
                }}
            >
                {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                        {desc}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}