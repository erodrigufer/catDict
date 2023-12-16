/**
 * sanitizeQuery transforms a query to get a correct response from
 * the backend, even if the original untransformed query does not
 * fulfill 100% of the query requirements of the backend.
 */
function sanitizeQuery(query: string): string {
  // Remove all characters before an apostrophe (') (’).
  const index =
    query.indexOf(`'`) !== -1 ? query.indexOf(`'`) : query.indexOf(`’`);
  // If the apostrophe character is not found then the indexOf() method returns -1.
  query = index !== -1 ? query.substring(index + 1) : query;

  // Remove points and commas and transform whole string to lowercase.
  return query.toLowerCase().replace(".", "").replace(",", "").replace(";", "");
}

export default sanitizeQuery;
