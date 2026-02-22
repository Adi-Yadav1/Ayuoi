import { useCart } from "@/app/context/CartContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Product {
  id: string;
  name: string;
  category: "herbs" | "oils" | "supplements" | "teas" | "skincare" | "books";
  price: number;
  rating: number;
  reviews: number;
  doshas: string[];
  description: string;
  benefits: string[];
  inStock: boolean;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Ashwagandha Root Powder",
    category: "herbs",
    price: 699,
    rating: 4.8,
    reviews: 245,
    doshas: ["vata", "kapha"],
    description: "Premium organic ashwagandha root powder for stress relief",
    benefits: [
      "Stress relief",
      "Better sleep",
      "Immune support",
      "Energy boost",
    ],
    inStock: true,
  },
  {
    id: "2",
    name: "Brahmi Oil",
    category: "oils",
    price: 549,
    rating: 4.7,
    reviews: 189,
    doshas: ["pitta"],
    description: "Traditional brahmi-infused coconut oil for hair and scalp",
    benefits: ["Hair growth", "Scalp health", "Mental clarity", "Cooling"],
    inStock: true,
  },
  {
    id: "3",
    name: "Triphala Churna",
    category: "herbs",
    price: 449,
    rating: 4.9,
    reviews: 312,
    doshas: ["vata", "pitta", "kapha"],
    description: "Balancing digestive support blend of three fruits",
    benefits: ["Digestion", "Detox", "Natural cleanse", "Immune support"],
    inStock: true,
  },
  {
    id: "4",
    name: "Sesame Oil - Cold Pressed",
    category: "oils",
    price: 379,
    rating: 4.6,
    reviews: 156,
    doshas: ["vata"],
    description: "Pure cold-pressed sesame oil for massage and cooking",
    benefits: ["Joint health", "Warming", "Skin nourishment", "Grounding"],
    inStock: true,
  },
  {
    id: "5",
    name: "Turmeric Supplement",
    category: "supplements",
    price: 799,
    rating: 4.8,
    reviews: 267,
    doshas: ["kapha", "pitta"],
    description: "Organic turmeric with black pepper for absorption",
    benefits: [
      "Anti-inflammatory",
      "Joint support",
      "Digestion",
      "Antioxidant",
    ],
    inStock: true,
  },
  {
    id: "6",
    name: "Chamomile Herbal Tea",
    category: "teas",
    price: 299,
    rating: 4.7,
    reviews: 198,
    doshas: ["pitta", "kapha"],
    description: "Organic chamomile flowers for relaxation",
    benefits: ["Sleep support", "Stress relief", "Digestion", "Calm"],
    inStock: true,
  },
  {
    id: "7",
    name: "Giloy Powder",
    category: "herbs",
    price: 529,
    rating: 4.6,
    reviews: 142,
    doshas: ["pitta", "kapha"],
    description: "Immune-boosting herb for overall wellness",
    benefits: ["Immunity", "Fever relief", "Energy", "Vitality"],
    inStock: true,
  },
  {
    id: "8",
    name: "Neem Face Paste",
    category: "skincare",
    price: 399,
    rating: 4.5,
    reviews: 178,
    doshas: ["pitta", "kapha"],
    description: "Natural neem paste for clear skin",
    benefits: ["Acne control", "Skin clarity", "Purifying", "Cooling"],
    inStock: true,
  },
  {
    id: "9",
    name: "Ayurveda Guide Book",
    category: "books",
    price: 1299,
    rating: 4.9,
    reviews: 89,
    doshas: ["vata", "pitta", "kapha"],
    description: "Complete guide to Ayurvedic living and wellness",
    benefits: ["Knowledge", "Self-care", "Lifestyle guide", "Recipe ideas"],
    inStock: true,
  },
  {
    id: "10",
    name: "Brahmi Leaves Powder",
    category: "herbs",
    price: 619,
    rating: 4.7,
    reviews: 156,
    doshas: ["pitta"],
    description: "Memory-enhancing brahmi herb powder",
    benefits: ["Mental clarity", "Memory boost", "Focus", "Cooling"],
    inStock: true,
  },
  {
    id: "11",
    name: "Aloe Vera Gel",
    category: "skincare",
    price: 349,
    rating: 4.8,
    reviews: 223,
    doshas: ["pitta"],
    description: "Pure aloe vera gel for skin and digestion",
    benefits: ["Skin healing", "Cooling", "Digestion", "Soothing"],
    inStock: true,
  },
  {
    id: "12",
    name: "Ginger Tea Mix",
    category: "teas",
    price: 279,
    rating: 4.6,
    reviews: 134,
    doshas: ["vata", "kapha"],
    description: "Warming spiced ginger tea blend",
    benefits: ["Digestion", "Warming", "Circulation", "Immune boost"],
    inStock: true,
  },
];

const CATEGORIES = [
  { id: "all", label: "All", icon: "store" as const },
  { id: "herbs", label: "Herbs", icon: "leaf" as const },
  { id: "oils", label: "Oils", icon: "water-droplet" as const },
  { id: "supplements", label: "Supplements", icon: "capsule" as const },
  { id: "teas", label: "Teas", icon: "cup-hot" as const },
  { id: "skincare", label: "Skincare", icon: "lotion-plus" as const },
  { id: "books", label: "Books", icon: "book" as const },
] as const;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFAF5",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2E2A24",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B5E4B",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6CCB5",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#2F2A23",
  },
  categoryRow: {
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 0,
  },
  categoryChip: {
    backgroundColor: "#FFF0DE",
    borderWidth: 1,
    borderColor: "#F2D2B5",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  categoryChipActive: {
    backgroundColor: "#E58B3A",
    borderColor: "#E58B3A",
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#5F5344",
  },
  categoryTextActive: {
    color: "#FFF7ED",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  productCard: {
    width: "48%",
    height: 380,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F1D9C4",
    flexDirection: "column",
  },
  productImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#FFF0DE",
    justifyContent: "center",
    alignItems: "center",
  },
  productImageEmoji: {
    fontSize: 48,
  },
  productContent: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2E2A24",
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: "#E58B3A",
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B5E4B",
  },
  reviews: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  doshaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginBottom: 8,
  },
  doshaBadge: {
    backgroundColor: "#E6F2FF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  doshaBadgeVata: {
    backgroundColor: "#E0F2FE",
  },
  doshaBadgePitta: {
    backgroundColor: "#FEF3C7",
  },
  doshaBadgeKapha: {
    backgroundColor: "#DCFCE7",
  },
  doshaText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#0369A1",
    textTransform: "capitalize",
  },
  doshaTextPitta: {
    color: "#B45309",
  },
  doshaTextKapha: {
    color: "#156B4B",
  },
  stockBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  stockText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#047857",
  },
  addButton: {
    backgroundColor: "#E58B3A",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
    marginTop: 8,
  },
  addButtonText: {
    color: "#FFF7ED",
    fontWeight: "700",
    fontSize: 12,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B5E4B",
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  filterActiveContainer: {
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  filterActiveLabel: {
    fontSize: 12,
    color: "#6B5E4B",
    fontWeight: "600",
    marginBottom: 4,
  },
  dotsMenu: {
    padding: 8,
  },
  productDetailModal: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  benefitsContainer: {
    marginTop: 12,
  },
  benefitsLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B5E4B",
    marginBottom: 8,
  },
  benefitsList: {
    gap: 6,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  benefitText: {
    fontSize: 13,
    color: "#374151",
    flex: 1,   
  },
});

const getProductEmoji = (category: string): string => {
  const emojis: Record<string, string> = {
    herbs: "🌿",
    oils: "🫒",
    supplements: "💊",
    teas: "🍵",
    skincare: "🧴",
    books: "📖",
  };
  return emojis[category] || "🫙";
};

const getDoshaBadgeStyle = (dosha: string) => {
  if (dosha === "vata") return styles.doshaBadgeVata;
  if (dosha === "pitta") return styles.doshaBadgePitta;
  return styles.doshaBadgeKapha;
};

const getDoshaTextStyle = (dosha: string) => {
  if (dosha === "pitta") return styles.doshaTextPitta;
  if (dosha === "kapha") return styles.doshaTextKapha;
  return styles.doshaText;
};

export default function AyurvedicStoreScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems, addToCart, removeFromCart } = useCart();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    console.log("Added to cart:", product.name);
  };

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
    console.log("Removed from cart:", productId);
  };

  const handleViewCart = () => {
    console.log("Navigating to cart with", cartItems.length, "items");
    router.push("/(app)/(tabs)/cart");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>🌿 Store</Text>
            <Text style={styles.subtitle}>
              Premium Ayurvedic herbs, oils & wellness products
            </Text>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              color="#E58B3A"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              placeholderTextColor="#8B7E6B"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryRow}
          >
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === cat.id && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <MaterialCommunityIcons
                  name={cat.icon}
                  size={16}
                  color={selectedCategory === cat.id ? "#FFF7ED" : "#5F5344"}
                />
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === cat.id && styles.categoryTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyText}>No products found</Text>
              <Text style={styles.emptySubtext}>
                Try a different search or category
              </Text>
            </View>
          ) : (
            <View style={styles.productGrid}>
              {filteredProducts.map((product) => (
                <View key={product.id} style={styles.productCard}>
                  {product.inStock && (
                    <View style={styles.stockBadge}>
                      <Text style={styles.stockText}>In Stock</Text>
                    </View>
                  )}

                  <View style={styles.productImage}>
                    <Text style={styles.productImageEmoji}>
                      {getProductEmoji(product.category)}
                    </Text>
                  </View>

                  <View style={styles.productContent}>
                    <View>
                      <Text style={styles.productName} numberOfLines={2}>
                        {product.name}
                      </Text>

                      <Text style={styles.productPrice}>₹{product.price}</Text>

                      <View style={styles.ratingRow}>
                        <Text style={styles.rating}>⭐ {product.rating}</Text>
                        <Text style={styles.reviews}>({product.reviews})</Text>
                      </View>

                      {product.doshas.length > 0 && (
                        <View style={styles.doshaContainer}>
                          {product.doshas.map((dosha) => (
                            <View
                              key={dosha}
                              style={[
                                styles.doshaBadge,
                                getDoshaBadgeStyle(dosha),
                              ]}
                            >
                              <Text
                                style={[
                                  styles.doshaText,
                                  getDoshaTextStyle(dosha),
                                ]}
                              >
                                {dosha}
                              </Text>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>

                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() =>
                        cartItems.find((item) => item.id === product.id)
                          ? handleRemoveFromCart(product.id)
                          : handleAddToCart(product)
                      }
                    >
                      <Text style={styles.addButtonText}>
                        {cartItems.find((item) => item.id === product.id)
                          ? "✓ Added"
                          : "Add to Cart"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Cart Badge */}
      {cartItems.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            console.log("Cart badge tapped, cart items:", cartItems.length);
            handleViewCart();
          }}
          activeOpacity={0.7}
          style={{
            position: "absolute",
            bottom: 80,
            right: 20,
            backgroundColor: "#E58B3A",
            borderRadius: 50,
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3,
            elevation: 5,
            zIndex: 999,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            {cartItems.length}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
