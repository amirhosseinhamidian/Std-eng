const generateMockData = () => {
    const numResults = 5; // Number of fake search results
    const mockData = [];
  
    for (let i = 1; i <= numResults; i++) {
        const details = [];
        const numSentences = 3; // Number of sentences per result
        for (let j = 1; j <= numSentences; j++) {
            details.push({
              sentence: `Sentence ${i * numSentences - numSentences + j}`,
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
  
  export default generateMockData;