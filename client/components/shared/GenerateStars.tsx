const GenerateStars = (ratings: any) => {
  const ratingValue = parseInt(ratings, 10);
  return Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`inline-block text-lg ${
        index < ratingValue ? "text-yellow-500" : "text-gray-300"
      }`}
    >
      ★
    </span>
  ));
};

export default GenerateStars;
