import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
export default function TabLayout(){return <Tabs screenOptions={{headerShown:false,tabBarActiveTintColor:"#0D9488",tabBarInactiveTintColor:"#94A3B8"}}>
<Tabs.Screen name="index" options={{title:"Home",tabBarIcon:({color,size})=><Ionicons name="people" color={color} size={size}/>}}/>
<Tabs.Screen name="statistics" options={{title:"Stats",tabBarIcon:({color,size})=><Ionicons name="bar-chart" color={color} size={size}/>}}/>
<Tabs.Screen name="bookmarks" options={{title:"Bookmarks",tabBarIcon:({color,size})=><Ionicons name="bookmark" color={color} size={size}/>}}/>
</Tabs>}
