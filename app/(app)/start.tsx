import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const MultiSelectScreen = () => {
    // Initial data for categories and keywords
    const [categories, setCategories] = useState([
        { id: '1', name: 'Mount' },
        { id: '2', name: 'Beach' },
        { id: '3', name: 'Crater' },
        { id: '4', name: 'Waterfall' },
        { id: '5', name: 'River' },
    ]);

    const [keywords, setKeywords] = useState([
        { id: '1', name: 'Adventure' },
        { id: '2', name: 'Nature' },
        { id: '3', name: 'Photography' },
        { id: '4', name: 'Hiking' },
        { id: '5', name: 'Camping' },
    ]);

    // States to keep track of selected items
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedKeywords, setSelectedKeywords] = useState([]);

    // Toggle selection for categories
    const toggleCategorySelection = (id) => {
        if (selectedCategories.includes(id)) {
            setSelectedCategories(selectedCategories.filter((item) => item !== id));
        } else {
            setSelectedCategories([...selectedCategories, id]);
        }
    };

    // Toggle selection for keywords
    const toggleKeywordSelection = (id) => {
        if (selectedKeywords.includes(id)) {
            setSelectedKeywords(selectedKeywords.filter((item) => item !== id));
        } else {
            setSelectedKeywords([...selectedKeywords, id]);
        }
    };

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.itemContainer,
                selectedCategories.includes(item.id) && styles.itemSelected,
            ]}
            onPress={() => toggleCategorySelection(item.id)}
        >
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderKeywordItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.itemContainer,
                selectedKeywords.includes(item.id) && styles.itemSelected,
            ]}
            onPress={() => toggleKeywordSelection(item.id)}
        >
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>Select Categories & Keywords</Text>

            {/* Categories Section */}
            <Text style={styles.sectionTitle}>Categories</Text>
            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />

            {/* Keywords Section */}
            <Text style={styles.sectionTitle}>Keywords</Text>
            <FlatList
                data={keywords}
                renderItem={renderKeywordItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
            />

            {/* Confirm Button */}
            <TouchableOpacity style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirm Selection</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    header: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        color: '#AAAAAA',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    listContainer: {
        marginBottom: 20,
    },
    itemContainer: {
        backgroundColor: '#1F1F1F',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        margin: 5,
        borderWidth: 1,
        borderColor: '#333333',
    },
    itemText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    itemSelected: {
        backgroundColor: '#0A84FF', // Color to indicate selection
        borderColor: '#0A84FF',
    },
    confirmButton: {
        backgroundColor: '#0A84FF',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MultiSelectScreen;

// export default function GettingStarted() {}
