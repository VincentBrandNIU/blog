import React, { useContext, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { Context as BlogContext } from '../context/BlogContext'
import { EvilIcons } from '@expo/vector-icons'

const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPosts } = useContext(BlogContext)
  //Refresh only at the beginning to call getBlogPosts first time and any tie we navigate back to index 
  useEffect(() => {
    getBlogPosts();
    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts(); 
    });
    return () => {
      listener.remove(); 
    };
  }, [])

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={blogPost => blogPost.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Show', { id: item.id })}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title} - {item.id}
                </Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <EvilIcons name='trash' style={styles.icon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

//New Section for Navigation options
IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <EvilIcons name='plus' size={50} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray'
  },
  title: {
    fontSize: 18
  },
  icon: {
    fontSize: 24
  }
})

export default IndexScreen
