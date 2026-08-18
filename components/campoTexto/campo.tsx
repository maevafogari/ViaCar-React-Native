import { useState } from "react";
import { View, Text, TextInput } from "react-native"

   type CampoProps = {
    label: string;
    placeholder?: string;
    value: string;
    setText: React.Dispatch<React.SetStateAction<string>> //isso serve pra mudar o set
};


const Campo = ({ value, label, placeholder = "", setText}: CampoProps) => {
    return (
        <View className="w-40"> 
                <Text> {label} </Text>
                <TextInput
                value={value}
                onChangeText={(e) => setText(e)}
                className="bg-white"
                placeholder={placeholder} />
            </View> 
    )
}

export default Campo