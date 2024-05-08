import React from "react";
import { Router } from "@remix-run/router";
import { describe, it, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { beforeEach } from "vitest";

import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { PlaylistGetContextProvider } from "../../../context/PlaylistGetContext";
import { PlaylistsGetAllContextProvider } from "../../../context/PlaylistsGetAllContext";
import { GeneratedContextProvider } from "../../../context/GeneratedContext";
import { mockServer } from "../../../../test-setup/mockServer";
import { HttpResponse, http } from "msw";
import { PlayerContextProvider } from "../../../context/PlayerContextProvider";
import { UserContextProvider } from "../../../context/UserContextProvider";
import "../../../i18n";
import ProfileUpdate from "../../../pages/ProfileUpdate";
import Home from "../../../pages/Home";
require("dotenv").config();
let router: Router;

describe("#UpdateProfile Page Test", () => {
  beforeEach(() => {
    require("dotenv").config();

    const routes = [
      { index: true, element: <Home /> },
      { path: "/profile-update", element: <ProfileUpdate /> },
    ];

    router = createMemoryRouter(routes, { initialEntries: ["/profile-update"] });
  });

  it("should allow user to update profile with valid inputs", async () => {
    mockServer.use(
      http.get("http://127.0.0.1:8000/api/user/get", () => {
        return HttpResponse.json(
          {
            user: {
              id: "1",
              firstName: "sami",
              lastName: "sami",
              preferredLanguage: "fi",
              userRatings: [],
            },
          },
          {
            status: 200,
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
      http.put("http://127.0.0.1:8000/api/user/update", async ({ request }) => {
        return HttpResponse.json(
          {
            user: {
              id: "newemail@com.com",
              firstName: "ThisIsMyNewFistName",
              lastName: "ThisIsMyNewLastName",
              preferredLanguage: "fi",
              userRatings: [],
            },
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

    expect(await screen.findByText("Edit user")).toBeInTheDocument();

    const user = userEvent.setup();

    const emailInput = screen.getByLabelText("Email");
    const firstNameInput = screen.getByLabelText("First name");
    const lastNameInput = screen.getByLabelText("Last name");
    const passwordInput = screen.getByLabelText("Password");
    const submitBtn = screen.getByText("Save");

    await user.type(emailInput, "newemail@com.com");
    await user.type(firstNameInput, "ThisIsMyNewFistName");
    await user.type(lastNameInput, "ThisIsMyNewLastName");
    await user.type(passwordInput, "new_password");
    await user.click(submitBtn);

    expect(await screen.findByText("ThisIsMyNewFistName")).toBeInTheDocument();
  });

  it("should display alert if any input field is empty", async () => {
    mockServer.use(
      http.get("http://127.0.0.1:8000/api/user/get", () => {
        return HttpResponse.json(
          {
            user: {
              id: "1",
              firstName: "sami",
              lastName: "sami",
              preferredLanguage: "fi",
              userRatings: [],
            },
          },
          {
            status: 200,
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
      http.put("http://127.0.0.1:8000/api/user/update", async ({ request }) => {
        return HttpResponse.json(
          {
            message: "please fill all fields",
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

    window.alert = vi.fn();

    expect(await screen.findByText("Edit user")).toBeInTheDocument();

    const user = userEvent.setup();

    const emailInput = screen.getByLabelText("Email");
    const firstNameInput = screen.getByLabelText("First name");
    const lastNameInput = screen.getByLabelText("Last name");
    const passwordInput = screen.getByLabelText("Password");
    const submitBtn = screen.getByText("Save");

    user.clear(emailInput);
    user.clear(firstNameInput);
    user.clear(lastNameInput);
    user.clear(passwordInput);
    await user.click(submitBtn);

    expect(window.alert).toHaveBeenCalledWith("Please fill in all fields");
  });

  it("should allow user to delete his profile", async () => {
    mockServer.use(
      http.get("http://127.0.0.1:8000/api/user/get", () => {
        return HttpResponse.json(
          {
            user: {
              id: "1",
              firstName: "sami",
              lastName: "sami",
              preferredLanguage: "fi",
              userRatings: [],
            },
          },
          {
            status: 200,
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
      http.delete("http://127.0.0.1:8000/api/user/delete", async ({ request }) => {
        return HttpResponse.json(
          {
            user: null,
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

    window.confirm = vi.fn(() => true);

    expect(await screen.findByText("Edit user")).toBeInTheDocument();

    const user = userEvent.setup();

    const submitBtn = screen.getByText("Delete profile");

    await user.click(submitBtn);

    expect(window.confirm).toHaveBeenCalledWith("Are you sure you want to delete your account?");
  });
});
