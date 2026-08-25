import { Drawer } from "expo-router/drawer";
import Header from "@/components/header/header";

export default function RootLayout() {
  return (
    <Drawer
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          title: "Home",
        }}
      />

      <Drawer.Screen
        name="login"
        options={{
          drawerLabel: "Login",
          title: "Login",
        }}
      />

      <Drawer.Screen
        name="cadastro"
        options={{
          drawerLabel: "Cadastro",
          title: "Cadastro",
        }}
      />
    </Drawer>
  );
}