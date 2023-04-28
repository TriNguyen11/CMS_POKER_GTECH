import { Center, useColorModeValue } from "@chakra-ui/react"
import { Audio } from "react-loader-spinner"

const Loading: React.FC = () => {
    const textColor = useColorModeValue("purple", "yellow")
    return (
        <Center h="100vh">
            <Audio height="100" width="50" color={textColor} ariaLabel="loading" />
        </Center>
    )
}

export default Loading
