import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Dynamic base URL
const getBaseUrl = () => {
  // Will use backend URL from environment variable (we'll set this later)
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  if (backendUrl) {
    return backendUrl;
  }
  
  // For now, use localhost backend during development
  return "http://localhost:8000/api/";
};

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
  tagTypes: ['Hotels', 'Locations'],
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
      invalidatesTags: ['Locations'],
    }),
    getAllLocations: build.query({
      query: () => "locations",
      providesTags: ['Locations'],
    }),
  }),
});

export const {
  useGetAllHotelsQuery,
  useGetHotelByIdQuery,
  useAddLocationMutation,
  useGetAllLocationsQuery,
} = api;