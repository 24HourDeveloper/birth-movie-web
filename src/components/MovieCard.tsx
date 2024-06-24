import { Card, Heading, Text, Image, Flex, Box } from "@chakra-ui/react";
import NoImg from "../img/no-img.png"

type Movie = {
  title: string;
  overview: string;
  poster_path: string;
}

type MovieCardTypes = {
  cardTitle: string;
  index: number;
  data: Array<Movie[]>;
}

export default function MovieCard({ cardTitle, data, index }: MovieCardTypes) {
  return (
    <>
    {
      data[index].length > 0 && 
      <Heading as='h2' size={['md','lg']} mb={8} mt={8} textTransform="uppercase">
        {cardTitle}
      </Heading>
    }
      <Flex gap={["2","8"]} wrap="wrap" justifyContent={["center", "start"]}>
        {data[index].map((movie, index) => {
          return (
            <Card w={[170, 220]} key={index}>
              <Image
                src={
                  movie.poster_path !== null
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : NoImg
                }
                title="Movie"
                borderTopRadius="6"
                w={[170, 220]}
              />
              <Box mx="8px">
                <Text fontSize={["sm", "lg"]} fontWeight="bold">
                  {movie.title}
                </Text>
              </Box>
            </Card>
          );
        })}
      </Flex>
    </>
  );
}
