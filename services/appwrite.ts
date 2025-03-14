import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

 interface MovieDocument {
  $id: string;
  searchTerm: string;
  movie_id: number;
  title: string;
  count: number;
  poster_url: string;
}

 export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
 
    const url = `https://cloud.appwrite.io/v1/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents`;

     const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Appwrite-Project": "67d35c4f0032ca2aeb33",
        "X-Appwrite-Response-Format": "1.6.0",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
 
     const documents: MovieDocument[] = result.documents;

     const existingMovie = documents.find(
      (doc) => doc.searchTerm === query && doc.movie_id === movie.id
    );

    if (existingMovie) {
 
      const updateResponse = await fetch(
        `https://cloud.appwrite.io/v1/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents/${existingMovie.$id}`,
        {
          method: "PATCH",
          headers: {
            "X-Appwrite-Project": "67d35c4f0032ca2aeb33",
            "X-Appwrite-Response-Format": "1.6.0",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: { count: existingMovie.count + 1 },
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error(
          `HTTP error on UPDATE! Status: ${updateResponse.status}`
        );
      }

     } else {
 
      const createResponse = await fetch(url, {
        method: "POST",
        headers: {
          "X-Appwrite-Project": "67d35c4f0032ca2aeb33",
          "X-Appwrite-Response-Format": "1.6.0",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentId: "unique()",
          data: {
            searchTerm: query,
            movie_id: movie.id,
            title: movie.title,
            count: 1,
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          },
        }),
      });

      if (!createResponse.ok) {
        throw new Error(
          `HTTP error on CREATE! Status: ${createResponse.status}`
        );
      }

      const createResult = await createResponse.json();
      console.log("✅ New document created successfully!", createResult);
    }
  } catch (error) {
    console.error("Error updating search count:", error);
  }
};

// export const getTrendingMovies = async (): Promise<
//   TrendingMovie[] | undefined
// > => {
//   try {
//     const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
//       Query.limit(5),
//       Query.orderDesc("count"),
//     ]);

//     return result.documents as unknown as TrendingMovie[];
//   } catch (error) {
//     console.error(error);
//     return undefined;
//   }
// };
export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
 
    const url = `https://cloud.appwrite.io/v1/databases/${DATABASE_ID}/collections/${COLLECTION_ID}/documents`;

     const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Appwrite-Project": "67d35c4f0032ca2aeb33",
        "X-Appwrite-Response-Format": "1.6.0",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
 
     const trendingMovies = result.documents
      .sort((a: TrendingMovie, b: TrendingMovie) => b.count - a.count)
      .slice(0, 5);  

    return trendingMovies;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return undefined;
  }
};
