import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Movie from './Movie';
import config from './config';

interface MovieInfoArgs {
    movie: Movie;
    navigation: any;
};

export default function MovieInfo({ movie, navigation }: MovieInfoArgs) {
    return (
        movie ? (
            <TouchableOpacity style={styles.container} onPress={async () => {
                const result = await (await fetch(`${config.apiurl}/?apikey=${config.apikey}&i=${movie.imdbID}`)).json();

                navigation.navigate('Details', { movie: result });
            }}>
                <View style={styles.container}>
                    <View style={styles.info}>
                        <Text style={styles.info__title}>Title: {movie.Title}</Text>
                    </View>
                    <Image source={{ uri: movie.Poster }} style={styles.image} ></Image>
                </View>
            </TouchableOpacity>
        ) : (
            <></>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#555',
        margin: 8,
        padding: 8,
        borderRadius: 4,
    },

    info: {
        padding: 8,
    },

    info__title: {
        fontSize: 24,
        color: 'white',
    },

    image: {
        width: 200,
        height: 200,
    }
});
