import UserNameForm from "../components/form";
import { Box } from '@mui/system';

import { Stack } from "@mui/material";
import WelcomeImage from '../assets/welcome.svg'

function HomePage() {
    return (
        <>
            <Stack sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Box component="img" src={WelcomeImage} sx={{ width: "30%", height: "30%" }} />
            </Stack>
            <UserNameForm />
        </>
    );
}

export default HomePage;
