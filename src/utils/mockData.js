const generateMockData = () => {
    const numResults = 5; // Number of fake search results
    const mockData = [];
  
    for (let i = 1; i <= numResults; i++) {
        const details = [];
        const numSentences = 3; // Number of sentences per result
        for (let j = 1; j <= numSentences; j++) {
            details.push({
              sentence: generateRandomString(500),
              page: j === numSentences ? 5 : Math.floor(Math.random() * 100) + 1, // Null for the last sentence
            });
          }
        mockData.push({
            id: i,
            title: `Result ${i}`,
            details,
            coverPhoto: `https://placekitten.com/200/300?image=1`, // Placeholder image
            designation: `D ${i * 100}-${i}`, // Added designation property
        });
    }
  
    return mockData;
  };

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