const generateMockData = () => {
  const numResults = 100; // Number of fake search results
  const itemsPerPage = 10; // Number of items per page
  const totalPages = Math.ceil(numResults / itemsPerPage);
  const mockData = [];

  for (let page = 1; page <= totalPages; page++) {
    const pageData = [];
    for (let i = 0; i < itemsPerPage; i++) {
      const id = (page - 1) * itemsPerPage + i + 1;
      pageData.push({
        id,
        title: `Result ${id}`,
        details: generateDetails(),
        coverPhoto: `https://placekitten.com/200/300?image=1`,
        designation: `D ${id * 100}-${id}`, // Added designation property
        screwCount: Math.floor(Math.random() * 100), // Random screw count
      });
    }
    mockData.push(pageData);
  }

  return { mockData, totalPages, itemsPerPage };
};

function generateDetails() {
  const numSentences = 3; // Number of sentences per result
  const details = [];
  for (let j = 1; j <= numSentences; j++) {
    details.push({
      sentence: generateRandomString(500),
      page: j === numSentences ? 5 : Math.floor(Math.random() * 100) + 1, // Null for the last sentence
    });
  }
  return details;
}

function generateRandomString(numberOfWords) {
  const words = [
    "Lorem", "ipsum", "dolor", "sit", "amet", "consectetur",
    "adipiscing", "elit", "sed", "do", "eiusmod", "tempor",
    "incididunt", "ut", "labore", "et", "dolore", "magna",
    "aliqua", "Ut", "enim", "ad", "minim", "veniam", "quis",
    "nostrud", "exercitation", "ullamco", "laboris", "nisi",
    "ut", "aliquip", "ex", "ea", "commodo", "consequat"
    // Add more words as needed
  ];

  const generatedWords = [];
  for (let i = 0; i < numberOfWords; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    generatedWords.push(words[randomIndex]);
  }

  return generatedWords.join(" ");
}

export default generateMockData;