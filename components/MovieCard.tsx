import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'

const MovieCard = (
    { id,
        poster_path,
        title,
        vote_average,
        release_date }: Movie
) => {
    return (
        <Link
            href={`/movie/${id}`}
            asChild
        >
            <TouchableOpacity className='w-[29%]'>
                <Image
                    source={{
                        uri: poster_path ?
                            `https://images.tmdb.org/t/p/w500${poster_path}` :
                            `https://placehold.co/600*400/1a1a1a/ffffff.png`
                    }}
                    className='w-full h-52 rounded-lg'
                    resizeMode='cover'
                />
                <Text className='fonst-bold text-white mt-2 text-sm' numberOfLines={1}>
                    {title}
                </Text>
                <View className='flex-row justify-start items-center gap-x-1'>
                    <Image source={icons.star} className='size-4' />
                    <Text className='text-white font-bold text-xs uppercase '>
                        {Math.round(vote_average / 2)}
                    </Text>
                </View>
                <View className='flex-row justify-between items-center w-full'>
                    <Text className='text-xs text-light-300 font-medium mt-1'>
                        {release_date?.split('-')[0]}
                    </Text>
                    <Text className='text-xs text-light-300 font-medium '>
                       MOVIE
                    </Text>
                </View>
            </TouchableOpacity>

        </Link>
    )
}

export default MovieCard