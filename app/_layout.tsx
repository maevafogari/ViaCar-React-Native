import { Drawer } from "expo-router/drawer";
import Header from "@/components/header/header";

export default function RootLayout() {
  return (
    <Drawer
      screenOptions={{
        header: (props) => <Header {...props} />,
        headerStatusBarHeight: 0,
        headerStyle: {
          backgroundColor: "#F8F9FA",
        },
      }}
    >
      <Drawer.Screen
        name="home"
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
      <Drawer.Screen
        name="carros"
        options={{
          drawerLabel: "Carros Disponíveis",
          title: "Carros Disponíveis",
        }}
      />
      <Drawer.Screen
        name="sobrenos"
        options={{
          drawerLabel: "Sobre nós",
          title: "Sobre nós",
        }}
      />
      <Drawer.Screen
        name="erro"
        options={{
          drawerLabel: "Erro",
          title: "Erro",
          headerShown: false,
           drawerItemStyle: { display: "none" }
        }}
      />
      <Drawer.Screen
        name="planos"
        options={{
          drawerLabel: "Planos",
          title: "Planos",
        }}
      />

      <Drawer.Screen
        name="cars/[id]"
        options={{ drawerItemStyle: { display: "none" } }}
      />

       <Drawer.Screen
        name="perfil"
        options={{
          drawerLabel: "Perfil",
          title: "Perfil",
        }}
      />

      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "index",
          title: "index",
          headerShown: false,
          drawerItemStyle: { display: "none" }
        }}
      />
      
    </Drawer>

      
    
  );
}
