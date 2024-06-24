import { Card, Image, Text, Heading, Flex, Box } from "@chakra-ui/react";

type BirthMovieType = {
  birthdayMovie: {
    title: string;
    overview: string;
    poster_path: string;
  }
}
type BirthCardTypes = {
  cardTitle: string;
  birthMovie: BirthMovieType | never[];
}

export default function BirthCard({
  cardTitle,
  birthMovie
}: BirthCardTypes) {
  if('birthdayMovie' in birthMovie){
    const title = birthMovie.birthdayMovie?.title
    const overView = birthMovie.birthdayMovie?.overview
    const img = `https://image.tmdb.org/t/p/w500${birthMovie.birthdayMovie?.poster_path}`
    return (
      <Flex direction="column" align="center">
        <Heading as='h2' size='xl' mb={8} mt={8}>
          {cardTitle}
        </Heading>
        <Card w="250px" mb="10px" display="flex">
          {title === null ? null : (
            <>
              <Image
                src={img}
                title="Movie"
                w="250px"
                borderTopRadius="6"
              />
              <Box ml="10px">
                <Text fontSize="lg" fontWeight="bold">
                  {title}
                </Text>
                <Text
                  fontSize='sm'
                  h="150px"
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "wrap",
                  }}
                >
                  {overView}
                </Text>
              </Box>
            </>
          )}
        </Card>
      </Flex>
    );
  }

  return (
    null
  )
}
