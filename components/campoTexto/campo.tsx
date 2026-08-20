import { View, Text, TextInput } from "react-native";

type CampoProps = {
    label?: string;
    placeholder?: string;
    value: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
};

const Campo = ({
    value,
    label,
    placeholder = "",
    setText,
    className
}: CampoProps) => {

    return (
    <>
            
            <TextInput
                value={value}
                onChangeText={setText}
                className="border border-gray-300 rounded-full pl-4"
                placeholder={placeholder}
            />

            </>
        
    );
};

export default Campo;