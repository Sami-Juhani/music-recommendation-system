import React from "react";
import { Router } from "@remix-run/router";
import { describe, it } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
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

describe("#Registration Page Test", () => {
  beforeEach(() => {
    require("dotenv").config();

    const routes = [
      { index: true, element: <Home /> },
      { path: "/registration", element: <Registration />, loader },
      { path: "/login", element: <Login /> },
    ];

    router = createMemoryRouter(routes, { initialEntries: ["/registration"], initialIndex: 2 });
  });

  it("should allow user to login with right crendentials", async () => {
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
            status: 401,
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
      }),
      http.post("http://127.0.0.1:8000/api/user/register", async ({ request }) => {
        return HttpResponse.json({ message: "Registration successful" }, { status: 200 });
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

    expect(await screen.findByText("Registration")).toBeInTheDocument();

    const user = userEvent.setup();

    const emailInput = screen.getByLabelText("Email");
    const firstNameInput = screen.getByLabelText("First name");
    const lastNameInput = screen.getByLabelText("Last name");
    const passwordInput = screen.getByLabelText("Password");
    const submitBtn = screen.getByText("Sign up");

    await user.type(emailInput, "user@user.com");
    await user.type(firstNameInput, "test");
    await user.type(lastNameInput, "user");
    await user.type(passwordInput, "password123");
    await user.click(submitBtn);

    expect(screen.queryByText("Registration")).not.toBeInTheDocument();
  });

  it("should not allow user to login with right invalid crendentials", async () => {
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
            status: 401,
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
      }),
      http.post("http://127.0.0.1:8000/api/user/register", async ({ request }) => {
        return HttpResponse.json({ message: "Wrong email or password" }, { status: 400 });
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

    expect(await screen.findByText("Registration")).toBeInTheDocument();

    const user = userEvent.setup();

    const emailInput = screen.getByLabelText("Email");
    const firstNameInput = screen.getByLabelText("First name");
    const lastNameInput = screen.getByLabelText("Last name");
    const passwordInput = screen.getByLabelText("Password");
    const submitBtn = screen.getByText("Sign up");

    user.clear(emailInput)
    user.clear(firstNameInput)
    user.clear(lastNameInput)
    user.clear(passwordInput)

    await user.type(emailInput, "user@user.com");
    await user.type(firstNameInput, "test");
    await user.type(lastNameInput, "user");
    await user.type(passwordInput, "wrong_password");

    await user.click(submitBtn);

    expect(await screen.findByText("Wrong email or password")).toBeInTheDocument();
  });

  it("should not allow user to login without crendentials", async () => {
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
            status: 401,
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
      }),
      http.post("http://127.0.0.1:8000/api/user/register", async ({ request }) => {
        return HttpResponse.json({ message: "Username and password required." }, { status: 400 });
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

    expect(await screen.findByText("Registration")).toBeInTheDocument();

    const user = userEvent.setup();

    const emailInput = screen.getByLabelText("Email");
    const firstNameInput = screen.getByLabelText("First name");
    const lastNameInput = screen.getByLabelText("Last name");
    const passwordInput = screen.getByLabelText("Password");
    const submitBtn = screen.getByText("Sign up");

    user.clear(emailInput)
    user.clear(firstNameInput)
    user.clear(lastNameInput)
    user.clear(passwordInput)

    await user.click(submitBtn);

    expect(await screen.findByText("Username and password required.")).toBeInTheDocument();
  });
});
