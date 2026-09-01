// import { useState } from 'react';
// import {
//     StyleSheet,
//     Text,
//     View,
//     Image,
//     TextInput,
//     TouchableOpacity,
//     ScrollView,
//     SafeAreaView,
//     // Dimensions,
// } from 'react-native';
// import {
//     Ionicons,
// } from '@expo/vector-icons';

// // const { width } = Dimensions.get('window');
// // const CARD_WIDTH = (width - 48) / 3;

// // const CARS = [
// //     { id: '1', name: 'Onix', category: 'Econômico', price: '129', image: 'https://via.placeholder.com/150' },
// //     { id: '2', name: 'HB20', category: 'Econômico', price: '139', image: 'https://via.placeholder.com/150' },
// //     { id: '3', name: 'Corolla', category: 'Sedan', price: '149', image: 'https://via.placeholder.com/150' },
// //     { id: '4', name: 'Creta', category: 'SUV', price: '199', image: 'https://via.placeholder.com/150' },
// //     { id: '5', name: 'Kicks', category: 'SUV', price: '199', image: 'https://via.placeholder.com/150' },
// //     { id: '6', name: 'HR-V', category: 'SUV', price: '229', image: 'https://via.placeholder.com/150' },
// // ];

// export default function App() {
//     const [isManual, setIsManual] = useState(false);
//     const [isAutomatic, setIsAutomatic] = useState(false);

//     return (
//         <SafeAreaView style={styles.container}>
//             <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

//                 { }
//                 <View style={styles.header}>
//                     <View style={styles.logoContainer}>
//                         <Ionicons name="car-sport" size={24} color="#FFC107" />
//                         <Text style={styles.logoText}>Via<Text style={styles.logoBold}>Car</Text></Text>
//                     </View>
//                     <TouchableOpacity style={styles.menuButton}>
//                         <Ionicons name="menu-outline" size={24} color="#333" />
//                     </TouchableOpacity>
//                 </View>

//                 { }
//                 <View style={styles.searchContainer}>
//                     <Ionicons name="search-outline" size={20} color="#FFC107" style={styles.searchIcon} />
//                     <TextInput placeholder="Filtrar veículos" style={styles.searchInput} placeholderTextColor="#999" />
//                     <Ionicons name="chevron-forward" size={18} color="#999" />
//                 </View>

//                 { }
//                 <View style={styles.filterCard}>
//                     <View style={styles.filterRow}>
//                         <Text style={styles.filterLabel}>Categoria</Text>
//                         <TouchableOpacity style={styles.dropdown}>
//                             <Text style={styles.dropdownText}>Todos</Text>
//                             <Ionicons name="chevron-down" size={16} color="#666" />
//                         </TouchableOpacity>
//                     </View>

//                     <View style={styles.divider} />

//                     {}
//                     <Text style={styles.filterLabel}>Preço máximo/dia</Text>
//                     <View style={styles.priceContainer}>
//                         <Text style={styles.priceMin}>R$50</Text>
//                         <View style={styles.sliderTrack}>
//                             <View style={styles.sliderFill} />
//                             <View style={styles.sliderThumb}>
//                                 <View style={styles.priceTooltip}>
//                                     <Text style={styles.priceTooltipText}>R$ 220</Text>
//                                 </View>
//                             </View>
//                         </View>
//                         <Text style={styles.priceMax}>R$ 220</Text>
//                     </View>

//                     <View style={styles.divider} />

//                     {}
//                     <View style={styles.filterRow}>
//                         <Text style={styles.filterLabel}>Transmissão</Text>
//                         <Ionicons name="chevron-forward" size={18} color="#999" />
//                     </View>
//                     <View style={styles.checkboxContainer}>
//                         <TouchableOpacity style={styles.checkboxRow} onPress={() => setIsManual(!isManual)}>
//                             <View style={[styles.checkbox, isManual && styles.checked]} />
//                             <Text style={styles.checkboxLabel}>Manual</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.checkboxRow} onPress={() => setIsAutomatic(!isAutomatic)}>
//                             <View style={[styles.checkbox, isAutomatic && styles.checked]} />
//                             <Text style={styles.checkboxLabel}>Automático</Text>
//                         </TouchableOpacity>
//                     </View>

//                     <View style={styles.divider} />

//                     {}
//                     <Text style={styles.filterLabel}>Marca</Text>
//                     <View style={styles.brandRow}>
//                         <View>
//                             <View style={styles.checkboxRow}>
//                                 <View style={styles.checkbox} />
//                                 <Text style={styles.checkboxLabel}>Toyota</Text>
//                             </View>
//                             <View style={styles.checkboxRow}>
//                                 <View style={styles.checkbox} />
//                                 <Text style={styles.checkboxLabel}>Chevrolet</Text>
//                             </View>
//                         </View>
//                         <TouchableOpacity style={styles.btnSearch}>
//                             <Ionicons name="search" size={18} color="#000" />
//                             <Text style={styles.btnSearchText}>Buscar</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 {}
//                 <View style={styles.sectionHeader}>
//                     <Text style={styles.sectionTitle}>Veículos em destaque</Text>
//                     <TouchableOpacity style={styles.seeAllContainer}>
//                         <Text style={styles.seeAllText}>Ver todos</Text>
//                         <Ionicons name="chevron-forward" size={14} color="#FFC107" />
//                     </TouchableOpacity>
//                 </View>

//                 {}
//                 <View style={styles.carGrid}>
//                     {CARS.map((car) => (
//                         <View key={car.id} style={styles.carCard}>
//                             <Image source={{ uri: car.image }} style={styles.carImage} />
//                             <View style={styles.carContent}>
//                                 <Text style={styles.carName}>{car.name}</Text>
//                                 <Text style={styles.carCategory}>{car.category}</Text>
//                                 <Text style={styles.priceSubtext}>A partir de</Text>
//                                 <Text style={styles.carPrice}>
//                                     <Text style={styles.currency}>R$</Text>
//                                     {car.price}
//                                     <Text style={styles.perDay}> /dia</Text>
//                                 </Text>
//                                 <TouchableOpacity style={styles.btnRent}>
//                                     <Text style={styles.btnRentText}>Alugar agora</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     ))}
//                 </View>

//                 {}
//                 <View style={styles.pagination}>
//                     <View style={[styles.dot, styles.activeDot]} />
//                     <View style={styles.dot} />
//                     <View style={styles.dot} />
//                 </View>

//             </ScrollView>

//             {}
//             <View style={styles.bottomNav}>
//                 <TouchableOpacity style={styles.navItem}>
//                     <Ionicons name="car-sport" size={22} color="#FFC107" />
//                     <Text style={[styles.navText, styles.activeNavText]}>Início</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.navItem}>
//                     <Ionicons name="calendar-outline" size={22} color="#888" />
//                     <Text style={styles.navText}>Reservas</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.navItem}>
//                     <Ionicons name="heart-outline" size={22} color="#888" />
//                     <Text style={styles.navText}>Favoritos</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.navItem}>
//                     <Ionicons name="person-outline" size={22} color="#888" />
//                     <Text style={styles.navText}>Perfil</Text>
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: '#F8F9FA' },
//     scrollContent: { padding: 16, paddingBottom: 80 },
//     header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
//     logoContainer: { flexDirection: 'row', alignItems: 'center' },
//     logoText: { fontSize: 20, fontWeight: '400', color: '#111', marginLeft: 6 },
//     logoBold: { fontWeight: '700' },
//     menuButton: { padding: 8, backgroundColor: '#FFF', borderRadius: 8, borderBottomWidth: 1, borderColor: '#EEE' },
//     searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 16, borderBottomWidth: 1, borderColor: '#EEE' },
//     searchIcon: { backgroundColor: '#FFF2C6', padding: 6, borderRadius: 8, marginRight: 8 },
//     searchInput: { flex: 1, fontSize: 14, color: '#333' },
//     filterCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 20, elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
//     filterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//     filterLabel: { fontSize: 13, fontWeight: '700', color: '#111', marginBottom: 8 },
//     dropdown: { flexDirection: 'row', alignItems: 'center' },
//     dropdownText: { fontSize: 13, color: '#666', marginRight: 4 },
//     divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 12 },
//     priceContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
//     priceMin: { fontSize: 11, color: '#AAA' },
//     priceMax: { fontSize: 11, color: '#AAA' },
//     sliderTrack: { flex: 1, height: 4, backgroundColor: '#EEE', marginHorizontal: 10, justifyContent: 'center' },
//     sliderFill: { width: '80%', height: 4, backgroundColor: '#FFC107' },
//     sliderThumb: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#FFF', borderWidth: 2, borderColor: '#FFC107', position: 'absolute', right: '20%', alignItems: 'center' },
//     priceTooltip: { position: 'absolute', top: -30, backgroundColor: '#1E232A', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
//     priceTooltipText: { color: '#FFF', fontSize: 11, fontWeight: 'bold' },
//     checkboxContainer: { flexDirection: 'row', marginTop: 4 },
//     checkboxRow: { flexDirection: 'row', alignItems: 'center', marginRight: 20, marginVertical: 4 },
//     checkbox: { width: 16, height: 16, borderWidth: 1, borderColor: '#CCC', borderRadius: 4, marginRight: 8 },
//     checked: { backgroundColor: '#FFC107', borderColor: '#FFC107' },
//     checkboxLabel: { fontSize: 12, color: '#555' },
//     brandRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
//     btnSearch: { backgroundColor: '#FFC107', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
//     btnSearchText: { fontWeight: 'bold', fontSize: 14, marginLeft: 6 },
//     sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
//     sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
//     seeAllContainer: { flexDirection: 'row', alignItems: 'center' },
//     seeAllText: { fontSize: 12, color: '#FFC107', fontWeight: '600' },
//     carGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
//     carCard: { width: CARD_WIDTH, backgroundColor: '#FFF', borderRadius: 12, overflow: 'hidden', marginBottom: 12, borderBottomWidth: 1, borderColor: '#EEE' },
//     carImage: { width: '100%', height: 70, resizeMode: 'cover' },
//     carContent: { padding: 8 },
//     carName: { fontSize: 13, fontWeight: '700', color: '#111' },
//     carCategory: { fontSize: 10, color: '#888', marginBottom: 4 },
//     priceSubtext: { fontSize: 8, color: '#AAA' },
//     carPrice: { fontSize: 14, fontWeight: 'bold', color: '#FFC107' },
//     currency: { fontSize: 10 },
//     perDay: { fontSize: 9, color: '#888', fontWeight: 'normal' },
//     btnRent: { backgroundColor: '#FFE899', paddingVertical: 6, borderRadius: 6, marginTop: 8, alignItems: 'center' },
//     btnRentText: { fontSize: 10, fontWeight: '600', color: '#222' },
//     pagination: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 12 },
//     dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#DDD', marginHorizontal: 3 },
//     activeDot: { backgroundColor: '#FFC107', width: 16 },
//     bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, borderColor: '#EEE' },
//     navItem: { alignItems: 'center' },
//     navText: { fontSize: 10, color: '#888', marginTop: 2 },
//     activeNavText: { color: '#FFC107', fontWeight: 'bold' },
// });

