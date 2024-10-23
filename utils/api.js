export async function getData(endpoint) {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL; 
  const response = await fetch(`${apiUrl}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Network response was not ok for ${endpoint}`);
  }

  return response.json(); 
}
