import { Drawer } from "expo-router/drawer";
import Header from "@/components/header/header";

export default function RootLayout() {
  return (
    <Drawer
      screenOptions={{
        header: (props) => <Header {...props} />,
        headerStatusBarHeight: 0,
        headerStyle: {
          backgroundColor: '#F8F9FA',
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
        name="filtro"
        options={{
          drawerLabel: "Filtro",
          title: "Filtro",
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
        name="detalhes"
        options={{
          drawerLabel: "Detalhes",
          title: "Detalhes",
        }}
      />
    </Drawer>
  );
}