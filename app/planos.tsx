import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PLANOS = [
  {
    id: '1',
    titulo: '1. Plano Econômico',
    descricao:
      'Veículos compactos, baixo consumo e manutenção programada. Condições facilitadas para quem busca economia sem abrir mão da qualidade.',
    preco: 'R$ 199,90/mês',
    imagem: 'https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/portable-navigation/jellys/11-images/SONIC.jpg?imwidth=1200',
  },
  {
    id: '2',
    titulo: '2. Plano Conforto',
    descricao:
      'Carros mais completos (ar, multimídia, direção elétrica), taxas reduzidas e assistência 24h. O melhor custo-benefício.',
    preco: 'R$ 399,90/mês',
    imagem: 'https://www.pinhochevrolet.com.br/content/dam/chevrolet/sa/br/pt/master/home/suvs/tracker/tracker-myr-2026/2-colorizer/lt-at-turbo/chevrolet-tracker-lt-cinza-rush.jpg?imwidth=1920',
  },
  {
    id: '3',
    titulo: '3. Plano Premium',
    descricao:
      'Veículos de alto padrão, atendimento exclusivo e máximo conforto. Para uma experiência completa em cada detalhe.',
    preco: 'R$ 699,90/mês',
    imagem: 'https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/portable-navigation/jellys/02-images/onix-plus-premiere-prata.jpg?imwidth=1200',
  },
];

export default function Aplicativo() {
  return (
    <SafeAreaView style={estilos.conteiner}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Cabecalho Superior */}
      <View style={estilos.cabecalho}>
        <View style={estilos.grupoLogo}>
          <View style={estilos.iconeLogo}>
            <Ionicons name="car-sport" size={22} color="#000" />
          </View>
          <Text style={estilos.textoLogo}>
            Via<Text style={estilos.logoNegrito}>Car</Text>
          </Text>
        </View>

        <View style={estilos.cabecalhoDireita}>
          <TouchableOpacity style={estilos.botaoReservar} activeOpacity={1}>
            <Text style={estilos.textoBotaoReservar}>Reservar agora</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.botaoPerfil} activeOpacity={1}>
            <Ionicons name="person-circle-outline" size={30} color="#222" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sub-cabecalho de Navegacao */}
      <View style={estilos.subCabecalho}>
        <Text style={estilos.tituloBoasVindas}>Bem-vindo ao ViaCar</Text>
        <View style={estilos.linksNavegacao}>
          <Text style={[estilos.linkNavegacao, estilos.linkNavegacaoAtivo]}>Planos</Text>
        </View>
      </View>

      {/* Conteudo Principal / Lista de Planos */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={estilos.conteudoRolagem}
      >
        {PLANOS.map((plano) => (
          <View key={plano.id} style={estilos.cartaoPlano}>
            {/* Imagem do Carro */}
            <View style={estilos.conteinerImagem}>
              <Image
                source={{ uri: plano.imagem }}
                style={estilos.imagemCarro}
                resizeMode="contain"
              />
            </View>

            {/* Informacoes do Plano */}
            <View style={estilos.conteudoCartao}>
              <Text style={estilos.tituloPlano}>{plano.titulo}</Text>
              <Text style={estilos.descricaoPlano}>{plano.descricao}</Text>

              <View style={estilos.conteinerPreco}>
                <Text style={estilos.precoPlano}>{plano.preco}</Text>
              </View>

              <TouchableOpacity style={estilos.botaoAceitar} activeOpacity={0.8}>
                <Text style={estilos.textoBotaoAceitar}>Aceitar Plano</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  grupoLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconeLogo: {
    backgroundColor: '#FFC107',
    padding: 6,
    borderRadius: 8,
    marginRight: 6,
  },
  textoLogo: {
    fontSize: 20,
    color: '#111111',
    fontWeight: '400',
  },
  logoNegrito: {
    fontWeight: '800',
  },
  cabecalhoDireita: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botaoReservar: {
    backgroundColor: '#FFC107',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
  },
  textoBotaoReservar: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
  },
  botaoPerfil: {
    padding: 2,
  },
  subCabecalho: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  tituloBoasVindas: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 8,
  },
  linksNavegacao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  linkNavegacao: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  linkNavegacaoAtivo: {
    color: '#111111',
    fontWeight: '700',
    borderBottomWidth: 2,
    borderBottomColor: '#FFC107',
    paddingBottom: 4,
  },
  conteudoRolagem: {
    padding: 16,
    gap: 20,
  },
  cartaoPlano: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#FFE082',
    shadowColor: '#FFC107',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  conteinerImagem: {
    width: '100%',
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  imagemCarro: {
    width: '100%',
    height: '100%',
  },
  conteudoCartao: {
    flex: 1,
  },
  tituloPlano: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 8,
  },
  descricaoPlano: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 16,
  },
  conteinerPreco: {
    marginBottom: 12,
  },
  precoPlano: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111111',
  },
  botaoAceitar: {
    backgroundColor: '#FFC107',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotaoAceitar: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
});