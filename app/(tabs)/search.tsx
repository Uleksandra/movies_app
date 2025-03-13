import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import MovieCard from '@/components/MovieCard'
import { useRouter } from 'expo-router'

const Search = () => {

  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesErrors
  } = useFetch(() =>
    fetchMovies({ query: '' })
  )
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='absolute flex-1 w-full z-0' resizeMode='cover' />
      <Text className='text-white'>Search</Text>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard
            {...item}
          />
          // <Text className='text-white text-sm'>{item.title}</Text>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        className='px-5'
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          marginVertical: 16,
          gap: 16
        }}
        contentContainerStyle={{
          paddingBottom: 100
        }}
        />
    </View>
  )
}

export default Search