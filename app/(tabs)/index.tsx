import { Text, View, Image, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { Link, useRouter } from 'expo-router'
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/SearchBar';
import useFetch from '@/services/useFetch';
import { fetchMovies } from '@/services/api';
import MovieCard from '@/components/MovieCard';

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesErrors
  } = useFetch(() =>
    fetchMovies({ query: '' })
  )
  return (
    <View
      className="flex-1 bg-primary"
    >
      <Image source={images.bg} className='absolute w-full z-0'  resizeMode='cover'/>
      <ScrollView
        className='flex-1 px-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: '100%', paddingBottom: 10
        }}>
        <Image source={icons.logo} className='w-12 h-10 mt-20 mx-auto' />
        {
          moviesLoading ? (
            <ActivityIndicator
              size='large'
              className='self-center mt-10'
              color='#0000ff'
            />
          ) : moviesErrors ? (
            <Text>Error: {moviesErrors?.message}</Text>
          ) :
            (
              <View className='flex-1 mt-5'>
                <SearchBar
                  onPress={() => router.push("/search")}
                  placeholder='Search for a movie'
                />

                <>
                  <Text className='text-lg text-white font-bold  mt-5 mb-3'>
                    Latest Movies
                  </Text>
                  <FlatList
                    data={movies}
                    renderItem={({item}) => (
                      <MovieCard
                      {...item}
                      />
                      // <Text className='text-white text-sm'>{item.title}</Text>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    columnWrapperStyle={{
                      justifyContent: 'flex-start',
                      marginBottom: 10,
                      gap: 20
                    }}
                    className='mt-2 pb-32'
                    scrollEnabled={false}
                  />
                </>
              </View>
            )

        }
      </ScrollView>
    </View>
  );
}
