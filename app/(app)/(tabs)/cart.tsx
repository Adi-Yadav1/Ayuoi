import { useCart } from "@/app/context/CartContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFAF5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E6CCB5",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2E2A24",
    flex: 1,
  },
  backButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  cartItemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E6CCB5",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  productImageBox: {
    width: 80,
    height: 80,
    backgroundColor: "#FFF0DE",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  productImageEmoji: {
    fontSize: 40,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2E2A24",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: "#E58B3A",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: "#E58B3A",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  quantityText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    minWidth: 30,
    textAlign: "center",
  },
  removeButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B5E4B",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 24,
  },
  continueShoppingButton: {
    backgroundColor: "#E58B3A",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueShoppingText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  bottomSummary: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: "#E6CCB5",
    backgroundColor: "#FFFAF0",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6B5E4B",
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  divider: {
    height: 1,
    backgroundColor: "#E6CCB5",
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#E58B3A",
  },
  proceedButton: {
    backgroundColor: "#E58B3A",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  proceedButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  proceedButtonDisabled: {
    backgroundColor: "#D1CCBA",
  },
});

export default function CartScreen() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    const item = cartItems.find((item) => item.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + delta);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  const handleProceedToPayment = async () => {
    if (cartItems.length === 0) {
      Alert.alert("Empty Cart", "Please add items to your cart");
      return;
    }

    setLoading(true);
    try {
      // TODO: Integrate with Razorpay payment gateway
      // For now, showing a success message
      Alert.alert(
        "Payment Initiated",
        `Processing payment for ₹${total.toFixed(2)}`,
        [
          {
            text: "Cancel",
            onPress: () => setLoading(false),
          },
          {
            text: "Confirm Payment",
            onPress: async () => {
              // Simulate payment processing
              setTimeout(() => {
                setLoading(false);
                Alert.alert("Success", "Payment completed successfully!", [
                  {
                    text: "OK",
                    onPress: () => {
                      clearCart();
                      router.push("/(app)/(tabs)/home");
                    },
                  },
                ]);
              }, 2000);
            },
          },
        ],
      );
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to process payment");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#E58B3A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🛒 Shopping Cart</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🛍️</Text>
            <Text style={styles.emptyText}>Your Cart is Empty</Text>
            <Text style={styles.emptySubtext}>
              Add some wellness products to get started
            </Text>
            <TouchableOpacity
              style={styles.continueShoppingButton}
              onPress={() => router.push("/(app)/(tabs)/ayurvedic-store")}
            >
              <Text style={styles.continueShoppingText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <>
          <ScrollView style={styles.scrollView}>
            <View style={styles.contentContainer}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItemCard}>
                  <View style={styles.productImageBox}>
                    <Text style={styles.productImageEmoji}>
                      {getProductEmoji(item.category)}
                    </Text>
                  </View>

                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName} numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemPrice}>₹{item.price}</Text>

                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleQuantityChange(item.id, -1)}
                      >
                        <Text style={styles.quantityButtonText}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleQuantityChange(item.id, 1)}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveItem(item.id)}
                  >
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={20}
                      color="#D14141"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Summary */}
          <View style={styles.bottomSummary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>GST (18%)</Text>
              <Text style={styles.summaryValue}>₹{tax.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>FREE</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹{total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.proceedButton,
                loading && styles.proceedButtonDisabled,
              ]}
              onPress={handleProceedToPayment}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
