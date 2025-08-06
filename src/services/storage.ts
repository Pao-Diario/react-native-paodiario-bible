import AsyncStorage from "@react-native-async-storage/async-storage";

const DEFAULT_KEY = "@PaoDiario=";

export async function persist(
  key: string,
  value: any,
  format: string = "JSON"
) {
  const serialized =
    format === "JSON" ? JSON.stringify(value) : value.toString();

  await AsyncStorage.setItem(DEFAULT_KEY.concat(key), serialized || "");
}

export async function get(key: string, format: string = "JSON") {
  let serialized = await AsyncStorage.getItem(DEFAULT_KEY.concat(key));
  serialized = serialized ? serialized.toString() : "";

  if (serialized && format === "JSON") {
    return JSON.parse(serialized);
  }
  if (serialized) {
    return serialized;
  }

  return null;
}
