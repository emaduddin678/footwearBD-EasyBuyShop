import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import wishlistApi from "@/lib/api/wishlist"

export interface WishlistItem {
  id: string | number
  name: string
  brand: string
  category: string
  gender: string
  price: number
  originalPrice: number
  image: string
  sizes: number[]
  unavailableSizes: number[]
  rating: number
  reviewCount: number
  badge: string | null
  addedAt: string
  imgBg: string
  imgFg: string
  imgText: string
}

interface WishlistState {
  items: WishlistItem[]
}

const initialState: WishlistState = { items: [] }

export const syncWishlistFromServer = createAsyncThunk(
  "wishlist/syncFromServer",
  async (_, { rejectWithValue }) => {
    try {
      const items = await wishlistApi.getWishlist()
      return items
        .filter((i) => i.productId && i.productId._id)
        .map((i) => {
          const p = i.productId
          return {
            id: p._id,
            name: p.title,
            brand: "",
            category: "",
            gender: "",
            price: p.sellingPrice,
            originalPrice: p.regularPrice ?? p.sellingPrice,
            image: p.primaryImage ?? "",
            sizes: [],
            unavailableSizes: [],
            rating: 0,
            reviewCount: 0,
            badge: null,
            addedAt: i.addedAt,
            imgBg: "f5f5f5",
            imgFg: "374151",
            imgText: p.title.split(" ")[0] ?? "",
          } satisfies WishlistItem
        })
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<WishlistItem>) {
      const exists = state.items.some(
        (i) => String(i.id) === String(action.payload.id),
      )
      if (!exists) {
        state.items.push({
          ...action.payload,
          addedAt: action.payload.addedAt || new Date().toISOString(),
        })
      }
    },
    removeFromWishlist(state, action: PayloadAction<{ id: string | number }>) {
      state.items = state.items.filter(
        (i) => String(i.id) !== String(action.payload.id),
      )
    },
    toggleWishlist(state, action: PayloadAction<WishlistItem>) {
      const idx = state.items.findIndex(
        (i) => String(i.id) === String(action.payload.id),
      )
      if (idx >= 0) {
        state.items.splice(idx, 1)
      } else {
        state.items.push({
          ...action.payload,
          addedAt: action.payload.addedAt || new Date().toISOString(),
        })
      }
    },
    clearWishlist(state) {
      state.items = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(syncWishlistFromServer.fulfilled, (state, action) => {
      state.items = action.payload
    })
  },
})

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } =
  wishlistSlice.actions

export default wishlistSlice.reducer
