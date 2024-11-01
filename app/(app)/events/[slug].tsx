import React from "react";
import { getEventBySlug } from "@/services/api/events";
import { useQuery } from "@tanstack/react-query";
import { Link, Redirect, router, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Event() {
  const { slug } = useLocalSearchParams();

  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryFn: () => getEventBySlug({ urlTemplateParams: { slug } }),
    queryKey: ["event", slug],
  });

  if (isError) {
    console.log(error);
  }

  if (isPending) {
    return (
      <View>
        <Text className="text-blue-400">Loading...</Text>
      </View>
    );
  }

  if (isSuccess)
    return (
      <ScrollView contentContainerStyle={styles.container} className="relative">
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: data?.banner,
            }}
            style={styles.image}
            contentFit="contain"
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color="#FF685C" />
            <Text style={styles.locationText}>Raja Ampat, Papua Barat</Text>
          </View>

          {/* <View style={styles.ratingContainer}>
          <Text style={styles.rating}>4.8</Text>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Ionicons name="star" size={16} color="#FFD700" />
          <Ionicons name="star" size={16} color="#FFD700" />
          <Ionicons name="star" size={16} color="#FFD700" />
          <Ionicons name="star-half" size={16} color="#FFD700" />
        </View> */}

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <Text style={styles.tabText}>About</Text>
            <Text style={styles.tabText}>Review</Text>
            <Text style={styles.tabText}>Photo</Text>
            <Text style={styles.tabText}>Video</Text>
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {data.description}
            {/* <Text style={styles.readMore}>Read More</Text> */}
          </Text>

          {/* Save a Trip Button */}
        </View>

        <Link href="/checkout">
          <TouchableOpacity
            style={styles.saveButton}
            className="absolute bottom-0 left-0 right-0 m-4"
          >
            <Text style={styles.saveButtonText}>Checkout</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    );
}

// light
// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     // backgroundColor: '#fff',
//   },
//   imageContainer: {
//     position: 'relative',
//     height: 250,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     borderBottomLeftRadius: 25,
//     borderBottomRightRadius: 25,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     borderRadius: 20,
//     padding: 8,
//   },
//   detailsContainer: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 5,
//   },
//   locationText: {
//     fontSize: 14,
//     color: '#777',
//     marginLeft: 5,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 5,
//   },
//   rating: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//     marginRight: 5,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     paddingBottom: 10,
//   },
//   tabText: {
//     fontSize: 14,
//     color: '#777',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 15,
//   },
//   description: {
//     fontSize: 14,
//     color: '#777',
//     marginVertical: 10,
//   },
//   readMore: {
//     color: '#000',
//     fontWeight: 'bold',
//   },
//   saveButton: {
//     backgroundColor: '#000',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//   },
// });

// dark
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 80,
    // backgroundColor: '#121212', // Dark background color
  },
  imageContainer: {
    position: "relative",
    height: 250,
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff", // Light text color for dark mode
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  locationText: {
    fontSize: 14,
    color: "#BBBBBB", // Light grey for secondary text
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginRight: 5,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333333", // Dark border color for tabs
    paddingBottom: 10,
  },
  tabText: {
    fontSize: 14,
    color: "#BBBBBB",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 15,
  },
  description: {
    fontSize: 14,
    color: "#BBBBBB",
    marginVertical: 10,
  },
  readMore: {
    color: "#BB86FC", // Accent color for "Read More"
    fontWeight: "bold",
  },
  saveButton: {
    // position: 'absolute',
    // bottom: 20,
    // left: 20,
    // right: 20,
    backgroundColor: "#BB86FC", // Dark mode accent color
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    // marginVertical: 20,
  },
  saveButtonText: {
    color: "#121212", // Dark background to contrast the button text
    fontWeight: "bold",
    fontSize: 16,
  },
});
