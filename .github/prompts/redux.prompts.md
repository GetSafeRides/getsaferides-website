# Create a New Redux Slice

## Rules

1. Create at `src/store/slices/{domain}Slice.ts` in camelCase with `Slice` suffix
2. Use `createSlice` from `@reduxjs/toolkit`
3. Define a `type {Domain}State = { ... }` for the slice state
4. Use `PayloadAction<T>` for all typed action payloads
5. Include a `reset` reducer to restore initial state
6. Include a `Partial<State>` updater for bulk updates
7. Export the reducer as default, actions as named
8. Add a typed convenience hook in `store/hooks.ts`

## Template

```ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type BookingState = {
  pickupAddress: string | null;
  destinationAddress: string | null;
  selectedVehicleId: string | null;
  estimatedPrice: number | null;
  isBooking: boolean;
};

const initialState: BookingState = {
  pickupAddress: null,
  destinationAddress: null,
  selectedVehicleId: null,
  estimatedPrice: null,
  isBooking: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setPickupAddress: (state, action: PayloadAction<string>) => {
      state.pickupAddress = action.payload;
    },
    setDestinationAddress: (state, action: PayloadAction<string>) => {
      state.destinationAddress = action.payload;
    },
    setSelectedVehicle: (state, action: PayloadAction<string>) => {
      state.selectedVehicleId = action.payload;
    },
    setEstimatedPrice: (state, action: PayloadAction<number>) => {
      state.estimatedPrice = action.payload;
    },
    setIsBooking: (state, action: PayloadAction<boolean>) => {
      state.isBooking = action.payload;
    },
    updateBookingState: (state, action: PayloadAction<Partial<BookingState>>) => {
      return { ...state, ...action.payload };
    },
    resetBooking: () => initialState,
  },
});

export const {
  setPickupAddress,
  setDestinationAddress,
  setSelectedVehicle,
  setEstimatedPrice,
  setIsBooking,
  updateBookingState,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
```

Then in `store/hooks.ts`:

```ts
export const useBooking = () => useAppSelector((state) => state.booking);
```

And register in `store/store.ts`:

```ts
import bookingReducer from "store/slices/bookingSlice";

const rootReducer = combineReducers({
  // ...existing slices...
  booking: bookingReducer,
});
```
