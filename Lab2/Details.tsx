import { any } from 'prop-types';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import Movie from './Movie';

interface DetailsProps {
    navigation: any;
    route: any;
};

export default function Details({ route }: DetailsProps) {
    const movie: Movie = route.params.movie;

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
            <Image source={{ uri: movie.Poster }} style={styles.image} ></Image>
            <View style={styles.info}>
                <Text style={styles.info__title}>Title: {movie.Title}</Text>
                <Text style={styles.info__title}>Genre: {movie.Genre}</Text>
                <Text style={styles.info__title}>Director: {movie.Director}</Text>
                <Text style={styles.info__title}>Metascore: {movie.Metascore}</Text>
                <Text style={styles.info__title}>Year: {movie.Year}</Text>
                <Text style={styles.info__title}>Plot: {movie.Plot}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#555',
    },

    info: {
        padding: 8,
    },

    info__title: {
        fontSize: 24,
        color: 'white',
    },

    image: {
        width: 300,
        height: 600,
    }
});