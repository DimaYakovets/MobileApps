import { useEffect, useRef, useState, SetStateAction } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, FlatList } from 'react-native';
import { } from "@react-navigation/native";

import MovieInfo from './MovieInfo';

import Movie from './Movie';
import config from './config';

interface MoveSearchResult {
  Search: [Movie];
  Response: boolean;
};

interface MoveRenderArgs {
  item: Movie
};

export default function Home({ navigation }) {
  const searchInput = useRef<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);


  async function serachMovies() {
    const result = await (await fetch(`${config.apiurl}/?apikey=${config.apikey}&s=${searchInput.current}`)).json();

    setMovies(result.Search);
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchControl}>
        <TextInput style={styles.textInput} onChangeText={(text: string) => searchInput.current = text}></TextInput>

        <TouchableOpacity style={styles.searchBtn} onPress={serachMovies}>
          <Text style={styles.searchBtnTxt}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList style={styles.list} data={movies} renderItem={({ item }: MoveRenderArgs) => <MovieInfo movie={item} navigation={navigation} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444',
    alignItems: 'center',
    margin: 0,
  },
  searchControl: {
    width: '90%',
    flexDirection: 'row',
    height: 64,
  },
  textInput: {
    fontSize: 35,
    borderColor: 'black',
    borderWidth: 2,
    padding: 3,
    flex: 7,
    marginTop: 10,
    textAlign: 'center',
    backgroundColor: '#ddd',
  },
  searchBtn: {
    marginTop: 8,
    backgroundColor: '#171',
    flex: 3,
    marginLeft: 8,
    alignItems: 'center'
  },
  searchBtnTxt: {
    fontSize: 30,
    paddingTop: 8,
    paddingBottom: 8,
  },
  list: {
    margin: 8
  }
});