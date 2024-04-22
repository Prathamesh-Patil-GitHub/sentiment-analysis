async function fetchRequest(method, url, body, bearerToken) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (bearerToken) {
    headers["Authorization"] = `Bearer ${bearerToken}`;
  }

  let options = {
    method: method.toUpperCase(),
    headers: headers,
  };

  if (method !== "GET" && method !== "HEAD") {
    options["body"] = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default fetchRequest;
