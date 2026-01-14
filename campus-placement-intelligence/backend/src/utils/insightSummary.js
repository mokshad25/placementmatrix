const summarizeTopItem = (items, key, valueKey) => {
  if (!items || items.length === 0) return null;

  const top = items.reduce((a, b) =>
    b[valueKey] > a[valueKey] ? b : a
  );

  return `Highest ${key} observed: ${top[key]} (${top[valueKey]}%)`;
};

module.exports = { summarizeTopItem };
