import { Image } from 'react-native';
import Movie from './Movie';

interface MovieInfoArgs {
    movie: Movie;
};

export default function MovieInfo({ movie }: MovieInfoArgs) {
    return (
        <>
            <Image source={{ uri: movie.Poster }}></Image>
        </>
    );
}
