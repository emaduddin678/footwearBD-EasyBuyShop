import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface WishlistItem {
  id: number
  name: string
  price: string
  imgBg: string
  imgFg: string
  imgText: string
}

interface WishlistState {
  items: WishlistItem[]
}

const initialState: WishlistState = { items: [] }

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<WishlistItem>) {
      const idx = state.items.findIndex((i) => i.id === action.payload.id)
      if (idx >= 0) {
        state.items.splice(idx, 1)
      } else {
        state.items.push(action.payload)
      }
    },
    clearWishlist(state) {
      state.items = []
    },
  },
})

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer
