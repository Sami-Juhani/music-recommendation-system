import fetchAccessToken from "./fetch";

export default async function fetchData(url) {
  const clientId = process.env.API_CLIENT_ID;
  const clientSecret = process.env.API_CLIENT_SECRET;
  const accessToken = await fetchAccessToken(clientId, clientSecret);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.json();
}
