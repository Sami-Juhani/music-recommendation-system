import React from "react";
import { Router } from "@remix-run/router";
import { describe, it } from "vitest";
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
import Layout from "../../../components/Layout";
import Page404 from "../../../pages/Page404";
import { RegistrationRoute } from "../../../pages/RegistrationPage";
import ProfileUpdate from "../../../pages/ProfileUpdate";
import { mainPageRoute } from "../../../pages/MainPage";
import PathConstants from "../../../routes/PathConstants";
require("dotenv").config();
let router: Router;

describe("#404Page Test", () => {
  beforeEach(() => {
    require("dotenv").config();

    router = createMemoryRouter(
      [
        {
          element: <Layout />,
          children: [
            { index: true, ...mainPageRoute },
            { path: "*", element: <Page404 /> },
            { ...RegistrationRoute },
            { path: PathConstants.PROFILE_UPDATE, element: <ProfileUpdate /> },
          ],
        },
      ],
      { initialEntries: ["/invalid-url"] }
    );
  });

  it("should display 404page when navigating to an invalid url", async () => {
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

    expect(await screen.findByText("notFound")).toBeInTheDocument();
  });
});
