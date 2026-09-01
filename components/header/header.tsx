import { View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DrawerHeaderProps } from "@react-navigation/drawer";

const Header = (props: DrawerHeaderProps) => {

  return (
    <SafeAreaView className="bg-[#F8F9FA] flex-row items-center justify-between mt-4 h-32 px-4">

  {/* Logo */}
  <Image
    source={require("../../assets/images/logo.png")}
    style={{ width: 170, height: 90 }}
    resizeMode="contain"
  />

  {/* Drawer */}
  <Pressable
    onPress={() => props.navigation.openDrawer()}
    className="items-center justify-center"
  >
    <Ionicons
      name="menu"
      size={32}
      color="black"
    />
  </Pressable>

</SafeAreaView>
  );
};

export default Header;