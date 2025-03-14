import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import useFetch from '@/services/useFetch'
import { fetchMovieDetails } from '@/services/api'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { icons } from '@/constants/icons'
import MovieInfo from '@/components/MovieInfo'
import { images } from '@/constants/images'

const MovieDetails = () => {
  const router = useRouter();

  const { id } = useLocalSearchParams()
  const {
    data: movieDetails,
    loading: detailsLoding,
    error: detailsError
  } = useFetch(() =>
    fetchMovieDetails(id as string)
  )
  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
      <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}` }}
          className='w-full h-[550px]'
          resizeMode='stretch'
        />

        <View className='mt-5 px-5 flex-col items-start justify-center'>
          <Text className='text-white font-bold text-xl'>{movieDetails?.title}</Text>
          <View className='flex-row items-center mt-2 gap-x-1'>
            <Text className='text-light-200 text-sm'>
              {movieDetails?.release_date.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">{" • "}</Text>

            <Text className='text-light-200 text-sm'>
              {movieDetails?.runtime}m
            </Text>
          </View>
          <View className='flex-row tems-center bg-dark-100 rounded-md px-2 py-1 gap-x-1 mt-2'>
            <Image source={icons.star} className='size-4' />
            <Text className='text-white text-sm'>{Math.round(movieDetails?.vote_average ?? 0)}/10</Text>
            <Text className='text-light-200 text-sm'>({movieDetails?.vote_count ?? 0} votes)</Text>
          </View>

          <MovieInfo label='Overvies' value={movieDetails?.overview} />
          <MovieInfo label='Genres' value={movieDetails?.genres.map((g) => g.name).join(' - ') || 'N/A'} />

          <View className='flex-row justify-between items-center w-1/2'>
            <MovieInfo label='Budget' value={`$${Math.round((movieDetails?.budget || 0) / 1000000)} millions`} />
            <MovieInfo label='Revenue' value={`$${Math.round((movieDetails?.revenue || 0)) / 1000000}`} />
          </View>

          <MovieInfo label='Production Companies' value={movieDetails?.production_companies.map((c) => c.name).join(' - ') || 'N/A'} />
        </View>
      </ScrollView>

      <TouchableOpacity
      onPress={router.back}
        className='z-50 h-[40px] flex-row bg-accent  w-full absolute bottom-14 left-0 right-0 rounded-lg items-center justify-center'
      >
        <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor='#fff' />
        <Text className='text-white text-base font-semibold'>
          Go Back
        </Text>
      </TouchableOpacity>
 
    </View>
  )
}

export default MovieDetails