import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./services/top";
import { bottomsApi } from "./services/bottom";
import { user } from "./services/user";
import { orderApi } from "./services/order";
import { homeApi } from "./services/home";
import { cart } from "./services/cart";
import { wishlistApi } from "./services/wishlist";
import { passwordApi } from "./services/password";
import { recommendationApi } from "./services/recommendation";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [bottomsApi.reducerPath]: bottomsApi.reducer,
    [user.reducerPath]: user.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [cart.reducerPath]: cart.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [passwordApi.reducerPath]: passwordApi.reducer,
    [recommendationApi.reducerPath]: recommendationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      bottomsApi.middleware,
      user.middleware,
      orderApi.middleware,
      homeApi.middleware,
      cart.middleware,
      wishlistApi.middleware,
      passwordApi.middleware,
      recommendationApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
