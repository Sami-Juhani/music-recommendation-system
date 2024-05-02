import React from "react";
import { Router } from "@remix-run/router";
import { describe, it } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { getByText, findByText, render, screen } from "@testing-library/react";
import { beforeEach } from "vitest";
import { Registration } from "../../../pages/RegistrationPage";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { loader } from "../../../utils/loader";
import { PlaylistGetContextProvider } from "../../../context/PlaylistGetContext";
import { PlaylistsGetAllContextProvider } from "../../../context/PlaylistsGetAllContext";
import { GeneratedContextProvider } from "../../../context/GeneratedContext";
import { mockServer } from "../../../../test-setup/mockServer";
import { HttpResponse, http } from "msw";
import { PlayerContextProvider } from "../../../context/PlayerContextProvider";
import { UserContextProvider } from "../../../context/UserContextProvider";
import Home from "../../../pages/Home";
import Login from "../../../pages/LoginPage";
import "../../../i18n";
require("dotenv").config();
let router: Router;

describe("#HomePage test", () => {
  beforeEach(() => {
    require("dotenv").config();

    const routes = [
      { index: true, element: <Home /> },
      { path: "/registration", element: <Registration />, loader },
      { path: "/login", element: <Login /> },
    ];

    router = createMemoryRouter(routes, { initialEntries: ["/", "/login", "/registration"], initialIndex: 0 });
  });

  it("should display users playlists", async () => {
    mockServer.use(
      http.get("http://127.0.0.1:8000/api/user/get", () => {
        return HttpResponse.json(
          {
            message: "Not found",
          },
          {
            status: 404,
          }
        );
      }),
      http.get("http://127.0.0.1:8000/api/spotify/player/playbackstate/", () => {
        return HttpResponse.json(
          {
            message: "Not found",
          },
          {
            status: 404,
          }
        );
      }),
      http.post("http://127.0.0.1:8000/api/user/login", () => {
        return HttpResponse.json(
          {
            user: {
              id: "1",
              fistName: "sami",
              lastName: "sami",
              preferredLanguage: "fi",
              userRatings: [],
            },
          },
          {
            status: 200,
            headers: {
              Location: "/",
            },
          }
        );
      }),
      http.get("http://127.0.0.1:8000/api/spotify/is-authenticated/", () => {
        return HttpResponse.json(
          {
            status: true,
          },
          {
            status: 200,
          }
        );
      }),
      http.get("http://127.0.0.1:8000/api/spotify/playlists/", () => {
        return HttpResponse.json({
          href: "http://example.com/playlists",
          items: [
            {
              id: "1",
              images: [{ url: "" }],
              name: "playlist 1",
              type: "playlist",
            },
            {
              id: "2",
              images: [{ url: "" }],
              name: "playlist 2",
              type: "playlist",
            },
          ],
        });
      }),
      http.get(`http://127.0.0.1:8000/api/spotify/playlist/1`, () => {
        return HttpResponse.json({
          href: "http://example.com/playlists",
          id: "4dawdc3215n22v2",
          images: [{ url: "" }],
          name: "Playlist",
          tracks: {
            items: [
              {
                id: "1",
                images: [{ url: "http://example.com/image/1" }],
                name: "playlist 2",
                type: "playlist",
                rating: { spotify_id: "4SjCJcgfhcZJ6wHdtJ5U8b", number_of_reviews: 2, overall_rating: 3.5 },
                track: { album: { images: [{ url: "" }] }, artists: [{ name: "artist" }], id: "feamcas", name: "song" },
              },
            ],
          },
        });
      }),
      http.get(`http://127.0.0.1:8000/api/spotify/playlist/2`, () => {
        return HttpResponse.json({
          href: "http://example.com/playlists",
          id: "4dawdc3215n22v2",
          images: [{ url: "" }],
          name: "playlist 2",
          tracks: {
            items: [
              {
                id: "1",
                images: [{ url: "http://example.com/image/1" }],
                name: "Playlist 1",
                type: "playlist",
                rating: { spotify_id: "4SjCJcgfhcZJ6wHdtJ5U8b", number_of_reviews: 2, overall_rating: 3.5 },
                track: { album: { images: [{ url: "" }] }, artists: [{ name: "artist" }], id: "feamcas", name: "song" },
              },
            ],
          },
        });
      }),
      http.get("http://127.0.0.1:8000/api/spotify/playlist/", () => {
        return HttpResponse.json(
          {
            tracks: {
              items: [
                {
                  track: {
                    id: "1",
                    href: "http://example.com/track/1",
                    album: {
                      images: [{ url: "http://example.com/image/1" }],
                      name: "Album 1",
                    },
                    name: "Track 1",
                    artists: [{ name: "Artist 1" }],
                    duration_ms: 200000,
                    preview_url: "http://example.com/preview/1",
                  },
                  rating: 5,
                },
              ],
            },
          },
          {
            status: 200,
          }
        );
      })
    );

    render(
      <PlaylistsGetAllContextProvider>
        <PlaylistGetContextProvider>
          <PlayerContextProvider>
            <UserContextProvider>
              <GeneratedContextProvider>
                <div className="relative flex">
                  <RouterProvider router={router} />
                </div>
              </GeneratedContextProvider>
            </UserContextProvider>
          </PlayerContextProvider>
        </PlaylistGetContextProvider>
      </PlaylistsGetAllContextProvider>
    );

    const playlist1 = await screen.findByText("playlist 1");
    const playlist2 = await screen.findByText("playlist 2");

    expect(playlist1).toBeInTheDocument();
    expect(playlist2).toBeInTheDocument();
  });

  it("should allow user to change playlist", async () => {
    mockServer.use(
      http.get("http://127.0.0.1:8000/api/user/get", () => {
        return HttpResponse.json(
          {
            message: "Not found",
          },
          {
            status: 404,
          }
        );
      }),
      http.get("http://127.0.0.1:8000/api/spotify/player/playbackstate/", () => {
        return HttpResponse.json(
          {
            message: "Not found",
          },
          {
            status: 404,
          }
        );
      }),
      http.post("http://127.0.0.1:8000/api/user/login", () => {
        return HttpResponse.json(
          {
            user: {
              id: "1",
              fistName: "sami",
              lastName: "sami",
              preferredLanguage: "fi",
              userRatings: [],
            },
          },
          {
            status: 200,
            headers: {
              Location: "/",
            },
          }
        );
      }),
      http.get("http://127.0.0.1:8000/api/spotify/is-authenticated/", () => {
        return HttpResponse.json(
          {
            status: true,
          },
          {
            status: 200,
          }
        );
      }),
      http.get("http://127.0.0.1:8000/api/spotify/playlists/", () => {
        return HttpResponse.json({
          href: "http://example.com/playlists",
          items: [
            {
              id: "1",
              images: [{ url: "" }],
              name: "playlist 1",
              type: "playlist",
            },
            {
              id: "2",
              images: [{ url: "" }],
              name: "playlist 2",
              type: "playlist",
            },
          ],
        });
      }),
      http.get(`http://127.0.0.1:8000/api/spotify/playlist/1`, () => {
        return HttpResponse.json({
          href: "http://example.com/playlists",
          id: "4dawdc3215n22v2",
          images: [{ url: "" }],
          name: "Playlist",
          tracks: {
            items: [
              {
                id: "1",
                images: [{ url: "http://example.com/image/1" }],
                name: "playlist 2",
                type: "playlist",
                rating: { spotify_id: "4SjCJcgfhcZJ6wHdtJ5U8b", number_of_reviews: 2, overall_rating: 3.5 },
                track: {
                  album: { images: [{ url: "" }] },
                  artists: [{ name: "artist1" }],
                  id: "feamcas",
                  name: "song",
                },
              },
            ],
          },
        });
      }),
      http.get(`http://127.0.0.1:8000/api/spotify/playlist/2`, () => {
        return HttpResponse.json({
          href: "http://example.com/playlists",
          id: "4dawdc3215n22v2",
          images: [{ url: "" }],
          name: "playlist 2",
          tracks: {
            items: [
              {
                id: "1",
                images: [{ url: "http://example.com/image/1" }],
                name: "Playlist 1",
                type: "playlist",
                rating: { spotify_id: "4SjCJcgfhcZJ6wHdtJ5U8b", number_of_reviews: 2, overall_rating: 3.5 },
                track: {
                  album: { images: [{ url: "" }] },
                  artists: [{ name: "artist2" }],
                  id: "feamcas",
                  name: "song",
                },
              },
            ],
          },
        });
      }),
      http.get("http://127.0.0.1:8000/api/spotify/playlist/", () => {
        return HttpResponse.json(
          {
            tracks: {
              items: [
                {
                  track: {
                    id: "1",
                    href: "http://example.com/track/1",
                    album: {
                      images: [{ url: "http://example.com/image/1" }],
                      name: "Album 1",
                    },
                    name: "Track 1",
                    artists: [{ name: "Artist 1" }],
                    duration_ms: 200000,
                    preview_url: "http://example.com/preview/1",
                  },
                  rating: 5,
                },
              ],
            },
          },
          {
            status: 200,
          }
        );
      })
    );

    render(
      <PlaylistsGetAllContextProvider>
        <PlaylistGetContextProvider>
          <PlayerContextProvider>
            <UserContextProvider>
              <GeneratedContextProvider>
                <div className="relative flex">
                  <RouterProvider router={router} />
                </div>
              </GeneratedContextProvider>
            </UserContextProvider>
          </PlayerContextProvider>
        </PlaylistGetContextProvider>
      </PlaylistsGetAllContextProvider>
    );

    const playlist1 = await screen.findByText("playlist 1");
    const playlist2 = screen.getByText("playlist 2");
    const playlist1Artist = await screen.findByText("artist1");

    expect(playlist1).toBeInTheDocument();
    expect(playlist2).toBeInTheDocument();
    // check playlist1's artist is in the document
    expect(playlist1Artist).toBeInTheDocument();

    const user = userEvent.setup();

    await user.click(playlist2);

    const playlist2Artist = screen.getByText("artist2");

    // check playlist2's artist is in the document
    expect(playlist2Artist).toBeInTheDocument();
  });

  it("should display recommendations when valid data is available", async () => {
    mockServer.use(
      http.get("http://127.0.0.1:8000/api/user/get", () => {
        return HttpResponse.json(
          {
            message: "Not found",
          },
          {
            status: 404,
          }
        );
      }),
      http.get("http://127.0.0.1:8000/api/spotify/player/playbackstate/", () => {
        return HttpResponse.json(
          {
            message: "Not found",
          },
          {
            status: 404,
          }
        );
      }),
      http.post("http://127.0.0.1:8000/api/user/login", () => {
        return HttpResponse.json(
          {
            user: {
              id: "1",
              fistName: "sami",
              lastName: "sami",
              preferredLanguage: "fi",
              userRatings: [],
            },
          },
          {
            status: 200,
            headers: {
              Location: "/",
            },
          }
        );
      }),
      http.get("http://127.0.0.1:8000/api/spotify/is-authenticated/", () => {
        return HttpResponse.json(
          {
            status: true,
          },
          {
            status: 200,
          }
        );
      }),
      http.get("http://127.0.0.1:8000/api/spotify/playlists/", () => {
        return HttpResponse.json({
          href: "http://example.com/playlists",
          items: [
            {
              id: "1",
              images: [{ url: "" }],
              name: "playlist 1",
              type: "playlist",
            },
            {
              id: "2",
              images: [{ url: "" }],
              name: "playlist 2",
              type: "playlist",
            },
          ],
        });
      }),
      http.get(`http://127.0.0.1:8000/api/spotify/playlist/1`, () => {
        return HttpResponse.json({
          href: "http://example.com/playlists",
          id: "4dawdc3215n22v2",
          images: [{ url: "" }],
          name: "Playlist",
          tracks: {
            items: [
              {
                id: "1",
                images: [{ url: "http://example.com/image/1" }],
                name: "playlist 2",
                type: "playlist",
                rating: { spotify_id: "4SjCJcgfhcZJ6wHdtJ5U8b", number_of_reviews: 2, overall_rating: 3.5 },
                track: {
                  album: { images: [{ url: "" }] },
                  artists: [{ name: "artist1" }],
                  id: "feamcas",
                  name: "song",
                },
              },
            ],
          },
        });
      }),
      http.get(`http://127.0.0.1:8000/api/spotify/playlist/2`, () => {
        return HttpResponse.json({
          href: "http://example.com/playlists",
          id: "4dawdc3215n22v2",
          images: [{ url: "" }],
          name: "playlist 2",
          tracks: {
            items: [
              {
                id: "1",
                images: [{ url: "http://example.com/image/1" }],
                name: "Playlist 1",
                type: "playlist",
                rating: { spotify_id: "4SjCJcgfhcZJ6wHdtJ5U8b", number_of_reviews: 2, overall_rating: 3.5 },
                track: {
                  album: { images: [{ url: "" }] },
                  artists: [{ name: "artist2" }],
                  id: "feamcas",
                  name: "song",
                },
              },
            ],
          },
        });
      }),
      http.get("http://127.0.0.1:8000/api/spotify/playlist/", () => {
        return HttpResponse.json(
          {
            tracks: {
              items: [
                {
                  track: {
                    id: "1",
                    href: "http://example.com/track/1",
                    album: {
                      images: [{ url: "http://example.com/image/1" }],
                      name: "Album 1",
                    },
                    name: "Track 1",
                    artists: [{ name: "Artist 1" }],
                    duration_ms: 200000,
                    preview_url: "http://example.com/preview/1",
                  },
                  rating: 5,
                },
              ],
            },
          },
          {
            status: 200,
          }
        );
      }),
      http.get("http://127.0.0.1:8000/api/recommendations/generate/1", () => {
        return HttpResponse.json(
          {
            id: ["1"],
            artists: ["generatedArtist"],
            name: ["generatedSong"],
            url: ["/"],
            year: ["1900"],
          },
          { status: 200 }
        );
      })
    );

    render(
      <PlaylistsGetAllContextProvider>
        <PlaylistGetContextProvider>
          <PlayerContextProvider>
            <UserContextProvider>
              <GeneratedContextProvider>
                <div className="relative flex">
                  <RouterProvider router={router} />
                </div>
              </GeneratedContextProvider>
            </UserContextProvider>
          </PlayerContextProvider>
        </PlaylistGetContextProvider>
      </PlaylistsGetAllContextProvider>
    );

    const user = userEvent.setup();

    const filterBtn = await screen.findByText("Generate recommendations");
    await user.click(filterBtn);

    expect(screen.getByText("generatedSong")).toBeInTheDocument();
  });

  it("should display error message if no recommendations are available", async () => {
    mockServer.use(
      http.get("http://127.0.0.1:8000/api/user/get", () => {
        return HttpResponse.json(
          {
            message: "Not found",
          },
          {
            status: 404,
          }
        );
      }),
      http.get("http://127.0.0.1:8000/api/spotify/player/playbackstate/", () => {
        return HttpResponse.json(
          {
            message: "Not found",
          },
          {
            status: 404,
          }
        );
      }),
      http.post("http://127.0.0.1:8000/api/user/login", () => {
        return HttpResponse.json(
          {
            user: {
              id: "1",
              fistName: "sami",
              lastName: "sami",
              preferredLanguage: "fi",
              userRatings: [],
            },
          },
          {
            status: 200,
            headers: {
              Location: "/",
            },
          }
        );
      }),
      http.get("http://127.0.0.1:8000/api/spotify/is-authenticated/", () => {
        return HttpResponse.json(
          {
            status: true,
          },
          {
            status: 200,
          }
        );
      }),
      http.get("http://127.0.0.1:8000/api/spotify/playlists/", () => {
        return HttpResponse.json({
          href: "http://example.com/playlists",
          items: [
            {
              id: "1",
              images: [{ url: "" }],
              name: "playlist 1",
              type: "playlist",
            },
            {
              id: "2",
              images: [{ url: "" }],
              name: "playlist 2",
              type: "playlist",
            },
          ],
        });
      }),
      http.get(`http://127.0.0.1:8000/api/spotify/playlist/1`, () => {
        return HttpResponse.json({
          href: "http://example.com/playlists",
          id: "4dawdc3215n22v2",
          images: [{ url: "" }],
          name: "Playlist",
          tracks: {
            items: [
              {
                id: "1",
                images: [{ url: "http://example.com/image/1" }],
                name: "playlist 2",
                type: "playlist",
                rating: { spotify_id: "4SjCJcgfhcZJ6wHdtJ5U8b", number_of_reviews: 2, overall_rating: 3.5 },
                track: {
                  album: { images: [{ url: "" }] },
                  artists: [{ name: "artist1" }],
                  id: "feamcas",
                  name: "song",
                },
              },
            ],
          },
        });
      }),
      http.get(`http://127.0.0.1:8000/api/spotify/playlist/2`, () => {
        return HttpResponse.json({
          href: "http://example.com/playlists",
          id: "4dawdc3215n22v2",
          images: [{ url: "" }],
          name: "playlist 2",
          tracks: {
            items: [
              {
                id: "1",
                images: [{ url: "http://example.com/image/1" }],
                name: "Playlist 1",
                type: "playlist",
                rating: { spotify_id: "4SjCJcgfhcZJ6wHdtJ5U8b", number_of_reviews: 2, overall_rating: 3.5 },
                track: {
                  album: { images: [{ url: "" }] },
                  artists: [{ name: "artist2" }],
                  id: "feamcas",
                  name: "song",
                },
              },
            ],
          },
        });
      }),
      http.get("http://127.0.0.1:8000/api/spotify/playlist/", () => {
        return HttpResponse.json(
          {
            tracks: {
              items: [
                {
                  track: {
                    id: "1",
                    href: "http://example.com/track/1",
                    album: {
                      images: [{ url: "http://example.com/image/1" }],
                      name: "Album 1",
                    },
                    name: "Track 1",
                    artists: [{ name: "Artist 1" }],
                    duration_ms: 200000,
                    preview_url: "http://example.com/preview/1",
                  },
                  rating: 5,
                },
              ],
            },
          },
          {
            status: 200,
          }
        );
      }),
      http.get("http://127.0.0.1:8000/api/recommendations/generate/1", () => {
        return HttpResponse.json(
          {
            message: "No songs are available in the datase, Cant't generate recommendations...",
          },
          { status: 404 }
        );
      })
    );

    render(
      <PlaylistsGetAllContextProvider>
        <PlaylistGetContextProvider>
          <PlayerContextProvider>
            <UserContextProvider>
              <GeneratedContextProvider>
                <div className="relative flex">
                  <RouterProvider router={router} />
                </div>
              </GeneratedContextProvider>
            </UserContextProvider>
          </PlayerContextProvider>
        </PlaylistGetContextProvider>
      </PlaylistsGetAllContextProvider>
    );

    const user = userEvent.setup();

    const filterBtn = await screen.findByText("Generate recommendations");
    await user.click(filterBtn);

    expect(
      screen.getByText("No songs are available in the datase, Cant't generate recommendations...")
    ).toBeInTheDocument();
  });
});
