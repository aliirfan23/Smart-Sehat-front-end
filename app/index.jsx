import { Link, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  
  const rootNavigationState=useRootNavigationState();
  useEffect(()=>{
    CheckNavLaoded();
  },[])
  
  const CheckNavLaoded=()=>{
    if(!rootNavigationState.key)
      return null;
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/getStarted">
      <Text>press here</Text>
      </Link>
      {/* <Text style={
        {fontFamily:'poppin-bold'}
      }>Edit app/index.tsx to edit this screen.</Text> */}
    </View>
  );
}
