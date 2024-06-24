import { useState, ChangeEvent } from 'react'
import { ChakraProvider, Text, CircularProgress, Box } from '@chakra-ui/react'
import CalendarCard from './components/CalendarCard'
//import ShareButton from './components/ShareButton'
import MovieCard from './components/MovieCard'
import BirthCard from './components/BirthCard'
import './App.css'

type Movie = {
  title: string;
  overview: string;
  poster_path: string;
}
type MovieReleases = {
  yearMovie: Movie[];
  monthMovie: Movie[];
  birthdayMovie: Movie;
}

function App() {
  const [date, setDate] = useState("2020-09-14")
  const [isLoading, setIsLoading] = useState(false)
  const [movie, setMovie] = useState<MovieReleases | []>([])
  const [error, setError] = useState("")


  const changeDate = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value)
  };

  const getDate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${date}`);
      const data = await response.json();
      if (data.status === 404) {
        setError(data.error);
        setIsLoading(false);
        return;
      }
      setMovie(data);
      setIsLoading(false);
      //const titles = data[2].map(item => item.title);
      //const formatedTitles = titles.slice(0, 5);
      //setShareMovies(formatedTitles.toString());
      //document.title = `${date.substring(0, 4)} Movies`; // this changes the site title dynamically based on your input date.
    } catch (err) {
      setError(`${err} check internet connection!`);
      setIsLoading(false);
    }
  };

  const formatDate = new Date(date);
  const cardTitleArray = [
    `${formatDate.toLocaleString('en-US', { month: 'long'})} ${date.substring(0, 4)} Releases`,
    `${date.substring(0, 4)} Releases`
  ];

  return (
    <ChakraProvider>
      <Box mx={[2, 4]} display="flex" flexDirection="column" alignItems="center" mt="10px">
        <CalendarCard date={date} changeDate={changeDate} getDate={getDate}/>
          {/* <Flex direction="column">
            {
              ["twitter", "facebook"].map(socialSite => (
                <ShareButton
                  key={socialSite}
                  label={`Share on ${socialSite}`}
                  social={socialSite}
                  handleClick={() => console.log('first')}
                  movieList={["heel", "bye"]}
                />
              ))
            }
          </Flex> */}
          {error ? (
          <>
            <Box w="100%" textAlign="center" mt="20px">
              <Text fontSize='sm' style={{ color: "red" }}>
                {error}
              </Text>
            </Box>
          </>
        ) : null}
        {Object.keys(movie).length > 0 ? (
          <>
            <BirthCard
              cardTitle="Movies Released The Day You Were Born"
              birthMovie={movie}
            />

            {'monthMovie' in movie && cardTitleArray.map((title, index) => {
              return (
                <MovieCard
                  key={index}
                  cardTitle={title}
                  data={[movie.monthMovie, movie.yearMovie]}
                  index={index}
                />
              );
            })}
          </>
        ) : isLoading ? (
          <>
            <Box w="100%" mt={20} textAlign="center">
              <CircularProgress value={80} />
              <Text fontSize='sm'>Fetching Movies</Text>
            </Box>
          </>
        ) : null}
      </Box>
    </ChakraProvider>
  )
}

export default App
