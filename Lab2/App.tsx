import { useEffect, useRef, useState, SetStateAction } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar } from 'react-native';
import config from './config';
import Movie from './Movie';
import MovieInfo from './MovieInfo';

interface MoveSearchResult {
  Search: [Movie];
  Response: boolean;
};

export default function App() {
  const searchInput = useRef(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async function () {
      //console.log(await (await fetch(`${config.apiurl}/?apikey=${config.apikey}&s=Interstellar`)).text());
      const result: MoveSearchResult = JSON.parse('{"Search":[{"Title":"Interstellar","Year":"2014","imdbID":"tt0816692","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"},{"Title":"The Science of Interstellar","Year":"2015","imdbID":"tt4415360","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMDFhNzU4MTMtYzZmNS00ZDEzLTg2MjQtYmUzZDA1ZWU4OTkzXkEyXkFqcGdeQXVyNDQ2MTMzODA@._V1_SX300.jpg"},{"Title":"Interstellar Wars","Year":"2016","imdbID":"tt5083736","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMzE5MmExYzMtYjQxYi00ZDlkLTkzMTYtMWQzNTZkMjBiYWI2L2ltYWdlXkEyXkFqcGdeQXVyNTM3MDMyMDQ@._V1_SX300.jpg"},{"Title":"Lolita from Interstellar Space","Year":"2014","imdbID":"tt3506492","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNDI1MmJmYWUtOTExZS00MGY3LWJhMzMtNThkYWJhZWQ1YmIyXkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SX300.jpg"},{"Title":"Interstellar: Nolan\'s Odyssey","Year":"2014","imdbID":"tt4172224","Type":"movie","Poster":"N/A"},{"Title":"Interstellar Civil War: Shadows of the Empire","Year":"2017","imdbID":"tt5056352","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMDJmYjQ4YmEtOTkzMS00MzQ3LWExNmUtMzgzZWQxMWJkZjk2XkEyXkFqcGdeQXVyMzM1MjQzNTk@._V1_SX300.jpg"},{"Title":"Inside \'Interstellar\'","Year":"2015","imdbID":"tt5297406","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BYzNhZjBmNmItZGQ0NS00Mzk4LWJhYTgtZDhkNWJmZTJmZDFmL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjE0OTE2MDY@._V1_SX300.jpg"},{"Title":"Transformers: Interstellar","Year":"2014–2015","imdbID":"tt6046050","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BMGYxMmM0ZWUtMzViMS00YzUxLTllZjEtYzI2YzAzYjlkMWY4XkEyXkFqcGdeQXVyNTY3NjQzNjM@._V1_SX300.jpg"},{"Title":"Interstellar","Year":"2005","imdbID":"tt0758429","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTgyNzUyMTQ3OV5BMl5BanBnXkFtZTgwNDg0OTE2MzE@._V1_SX300.jpg"},{"Title":"Interstellar Ranger Commence","Year":"2022–","imdbID":"tt11236038","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BMjk4MWQyZjQtMmY2ZS00YjdmLTgzMDUtYTc5ZDU5NzQzMmJmXkEyXkFqcGdeQXVyOTgwMDkwNzY@._V1_SX300.jpg"}],"totalResults":"33","Response":"True"}');
      console.log(result.Search);
      setMovies(result.Search);
    })();
  });

  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} onTextInput={(value: any) => searchInput.current = value}></TextInput>
      <TouchableOpacity style={styles.searchBtn} onPress={() => console.log(searchInput.current)}>
        <Text style={styles.searchBtnTxt}>Click me</Text>
      </TouchableOpacity>
      <MovieInfo movie={movies[0]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#c42',
    alignItems: 'center',
    margin: 0,
  },
  textInput: {
    fontSize: 35,
    borderColor: 'black',
    borderWidth: 2,
    padding: 3,
    width: '40%',
    marginTop: 10,
    textAlign: 'center',
    backgroundColor: '#ddd',
  },
  searchBtn: {
    marginTop: 8,
    backgroundColor: '#171',
    width: '40%',
    alignItems: 'center'
  },
  searchBtnTxt: {
    fontSize: 35,
    padding: 4,
  },
});

