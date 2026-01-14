const getConfidenceLevel = (sampleSize) => {
  if (sampleSize < 5) return "LOW";
  if (sampleSize < 15) return "MEDIUM";
  return "HIGH";
};

module.exports = { getConfidenceLevel };
