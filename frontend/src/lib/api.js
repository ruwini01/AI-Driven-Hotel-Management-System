import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Dynamic base URL - works for both development and production
const getBaseUrl = () => {
  // In production (Vercel), use relative URL since frontend and backend are on same domain
  if (import.meta.env.PROD) {
    return "/api/";
  }
  // In development, use localhost backend
  return import.meta.env.VITE_API_URL || "http://localhost:8000/api/";
};

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders: async (headers) => {
      return new Promise((resolve) => {
        async function checkToken() {
          const clerk = window.Clerk;
          if (clerk) {
            const token = await clerk.session?.getToken();
            if (token) {
              headers.set("Authorization", `Bearer ${token}`);
            }
            resolve(headers);
          } else {
            setTimeout(checkToken, 500);
          }
        }
        checkToken();
      });
    },
  }),
  tagTypes: ['Hotels', 'Locations'], // Add cache tags for better cache management
  endpoints: (build) => ({
    getAllHotels: build.query({
      query: () => "hotels",
      providesTags: ['Hotels'],
    }),
    getHotelById: build.query({
      query: (id) => `hotels/${id}`,
      providesTags: (result, error, id) => [{ type: 'Hotels', id }],
    }),
    addLocation: build.mutation({
      query: (location) => ({
        url: "locations",
        method: "POST",
        body: {
          name: location.name,
        },
      }),
      invalidatesTags: ['Locations'], // Refresh locations after adding
    }),
    getAllLocations: build.query({
      query: () => "locations",
      providesTags: ['Locations'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllHotelsQuery,
  useGetHotelByIdQuery,
  useAddLocationMutation,
  useGetAllLocationsQuery,
} = api;