import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import HomeScreen from './home';
import PlansScreen from './plans';
import FoodTrackingScreen from './food-tracking';
import AnalyticsScreen from './analytics';
import ProfileScreen from './profile';
import Dietitian from '../(tabs)/dietAI'

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#EE9B4D',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#FEFAF5',
          borderTopColor: '#f0f0f0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500'
        }
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="plans"
        component={PlansScreen}
        options={{
          title: 'Plans',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book-open" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="Diet"
        component={Dietitian}
        options={{
          title: 'Diet',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book-open" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="food-tracking"
        component={FoodTrackingScreen}
        options={{
          title: 'Food',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="camera" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="analytics"
        component={AnalyticsScreen}
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chart-line" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}
