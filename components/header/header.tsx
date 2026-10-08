import { Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DrawerHeaderProps } from "expo-router/drawer";

const Header = (props: DrawerHeaderProps) => {
  return (
    <SafeAreaView className="bg-[#F8F9FA] flex-row items-center justify-center h-10 ">

      <Pressable
        onPress={() => props.navigation.openDrawer()}
        className="absolute left-4 items-center justify-center mt-12 "
      >
        <Ionicons
          name="menu"
          size={32}
          color="black"
        />
      </Pressable>

      
      <Image
        source={require("../../assets/images/logoviacar.png")}
        style={{ width: 170, height: 90, marginTop: 65}}
        resizeMode="contain"
      />

    </SafeAreaView>
  );
};

export default Header;