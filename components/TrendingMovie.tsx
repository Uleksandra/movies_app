import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import MaskedView from "@react-native-masked-view/masked-view";
import rankingGradient from '@/assets/images/rankingGradient.png';
import { images } from '@/constants/images';

const TrendingMovie = ({ movie: { movie_id, title, poster_url }, index }: TrendingCardProps) => {
    return (
        <Link href={`/movie/${movie_id}`} asChild>
            <TouchableOpacity className='w-32 relative pl-5'>
                <Image source={{
                    uri: poster_url ?
                        `https://images.tmdb.org/t/p/w500${poster_url}` :
                        `https://placehold.co/600*400/1a1a1a/ffffff.png`
                }}
                    resizeMode='cover' className='w-32 h-48 rounded-lg' />

                <View className='absolute bottom-9 -left-3.5 px-2 py-1 rounded-full'>
                    <MaskedView maskElement={
                        <Text className='text-white text-6xl font-bold'>{index + 1}</Text>
                    }>
                        <Image
                            source={images.rankingGradient}
                            className='size-14'
                            resizeMode='cover'
                        />
                    </MaskedView>
                </View>
                <Text className='text-light-200 text-sm font-bold mt-2' numberOfLines={2}>
                    {title}
                </Text>
            </TouchableOpacity>
        </Link>
    )
}

export default TrendingMovie