import React from "react";
import { Router } from "@remix-run/router";
import { describe, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach } from "vitest";
import { Registration } from "../pages/RegistrationPage";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { loader } from "../utils/loader";
import { PlaylistGetContextProvider } from "../context/PlaylistGetContext";
import { PlaylistsGetAllContextProvider } from "../context/PlaylistsGetAllContext";
import { GeneratedContextProvider } from "../context/GeneratedContext";
import { mockServer } from "../../test-setup/mockServer";
import { HttpResponse, http } from "msw";
import { PlayerContextProvider } from "../context/PlayerContextProvider";
import { UserContextProvider } from "../context/UserContextProvider";
import Home from "../pages/Home";
import Login from "../pages/LoginPage";
import "../i18n";
require("dotenv").config();
let router: Router;

describe("Login page test", () => {
  beforeEach(() => {
    require("dotenv").config();

    const routes = [
      { index: true, element: <Home /> },
      { path: "/registration", element: <Registration />, loader },
      { path: "/login", element: <Login /> },
    ];

    router = createMemoryRouter(routes, { initialEntries: ["/", "/login", "/registration"], initialIndex: 1 });
  });

  it("should redirect to home after succesfull login", async () => {
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
              name: "artist",
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

    const emailInput = await screen.findByTestId("loginEmailInput");
    const passwordInput = await screen.findByTestId("loginPasswordInput");
    const submitBtn = await screen.findByTestId("loginSubmitBtn");

    // Validate that Login page is used
    expect(submitBtn).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "sami@sami.com" } });
    fireEvent.change(passwordInput, { target: { value: "sami" } });

    fireEvent.click(submitBtn);

    // Validate redirect works
    const homeText = await screen.findByText("Koti");
    expect(homeText).toBeInTheDocument();
    expect(submitBtn).not.toBeInTheDocument();
  });

  it("should not allow you to login with wrong crendetials", async () => {
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
            message: "Wrong email or password",
          },
          {
            status: 401,
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
              images: [{ url: "http://example.com/image/1" }],
              name: "Playlist 1",
              type: "playlist",
            },
          ],
        });
      }),
      http.get("http://127.0.0.1:8000/api/spotify/playlist", () => {
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
                name: "Playlist 1",
                type: "playlist",
                rating: { spotify_id: "4SjCJcgfhcZJ6wHdtJ5U8b", number_of_reviews: 2, overall_rating: 3.5 },
                track: { album: { images: [{ url: "" }] }, artists: [{ name: "artist" }], id: "feamcas", name: "song" },
              },
            ],
          },
        });
      }),
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

    const emailInput = await screen.findByTestId("loginEmailInput");
    const passwordInput = await screen.findByTestId("loginPasswordInput");
    const submitBtn = await screen.findByTestId("loginSubmitBtn");

    // Validate that Login page is used
    expect(submitBtn).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });

    fireEvent.click(submitBtn);

    const errorMsg = await screen.findByText("Wrong email or password");

    // Validate no redirect is not being made
    expect(errorMsg).toBeInTheDocument();
  });
  it("should not allow you to login without email or password", async () => {
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
            message: "Email and password required",
          },
          {
            status: 401,
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
              images: [{ url: "http://example.com/image/1" }],
              name: "Playlist 1",
              type: "playlist",
            },
          ],
        });
      }),
      http.get("http://127.0.0.1:8000/api/spotify/playlist", () => {
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
                name: "Playlist 1",
                type: "playlist",
                rating: { spotify_id: "4SjCJcgfhcZJ6wHdtJ5U8b", number_of_reviews: 2, overall_rating: 3.5 },
                track: { album: { images: [{ url: "" }] }, artists: [{ name: "artist" }], id: "feamcas", name: "song" },
              },
            ],
          },
        });
      }),
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
  
    const emailInput = await screen.findByTestId("loginEmailInput");
    const passwordInput = await screen.findByTestId("loginPasswordInput");
    const submitBtn = await screen.findByTestId("loginSubmitBtn");
  
    // Validate that Login page is used
    expect(submitBtn).toBeInTheDocument();
  
    fireEvent.change(emailInput, { target: { value: "sami@sami.com" } });
    fireEvent.change(passwordInput, { target: { value: "sami" } });
  
    fireEvent.click(submitBtn);
  
    const errorMsg = await screen.findByText("Email and password required");
  
    // Validate error message is displayed properly
    expect(errorMsg).toBeInTheDocument();
  });
  
  it("should set app language to user's preferred language", async () => {
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
              images: [{ url: "http://example.com/image/1" }],
              name: "Playlist 1",
              type: "playlist",
            },
          ],
        });
      }),
      http.get("http://127.0.0.1:8000/api/spotify/playlist", () => {
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
                name: "Playlist 1",
                type: "playlist",
                rating: { spotify_id: "4SjCJcgfhcZJ6wHdtJ5U8b", number_of_reviews: 2, overall_rating: 3.5 },
                track: { album: { images: [{ url: "" }] }, artists: [{ name: "artist" }], id: "feamcas", name: "song" },
              },
            ],
          },
        });
      }),
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
  
    const emailInput = await screen.findByTestId("loginEmailInput");
    const passwordInput = await screen.findByTestId("loginPasswordInput");
    const submitBtn = await screen.findByTestId("loginSubmitBtn");
  
    // Validate that Login page is used
    expect(submitBtn).toBeInTheDocument();
    
    // Choose a user with "fi" as preferred language
    fireEvent.change(emailInput, { target: { value: "sami@sami.com" } });
    fireEvent.change(passwordInput, { target: { value: "sami" } });
  
    fireEvent.click(submitBtn);
  
    const languageElement = await screen.findByText("Kirjaudu ulos");
  
    // Validate there is finnish text in the document
    expect(languageElement).toBeInTheDocument();
  });
});

