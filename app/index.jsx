import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl mb-3">HRWells presents</Text>
      <Text className="text-3xl font-pblack">Hora!</Text>
      <StatusBar style="auto" />
      <Link href={"/home"} className="text-blue-600 mt-1">
        Go to Profile
      </Link>
    </View>
  );
}
