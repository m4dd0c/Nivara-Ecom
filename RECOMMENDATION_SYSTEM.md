# Recommendation System Implementation

## Overview

Implemented a product recommendation system that suggests similar items based on style and design attributes.

---

## Backend (.NET)

### **RecommendationController.cs**

Location: `/server/Controller/RecommendationController.cs`

**Endpoint:**

```
GET /api/v1/recommendation/{id}?sortBy=newest
```

**Parameters:**

- `id` (route) - GUID of the product (Top or Bottom)
- `sortBy` (query, optional) - Sort order: `newest`, `oldest`, `popular`, `top-rated`, `most-sold`
  - Default: `newest`

**Logic:**

1. Searches for the product in both Tops and Bottoms tables
2. If found in Tops:
   - Finds similar Tops based on matching `style` or `design`
   - Finds similar Bottoms based on matching `style`
3. If found in Bottoms:
   - Finds similar Bottoms based on matching `style`
   - Finds similar Tops based on matching `style`
4. Excludes the original product from results
5. Returns up to 20 recommendations per category (40 total max)

**Response:**

```json
{
  "size": 15,
  "data": [
    // Array of Top and Bottom objects
  ]
}
```

---

## Frontend (Next.js)

### **Redux Service**

Location: `/client/store/services/recommendation.ts`

**Hook:**

```typescript
useGetRecommendationsQuery({ id, sortBy });
```

**Usage Example:**

```typescript
const { data, isLoading, error } = useGetRecommendationsQuery({
  id: productId,
  sortBy: "popular",
});
```

### **Recommendation Component**

Location: `/client/app/(screen)/product/[id]/components/Recommendation.tsx`

**Features:**

- ✅ Client-side component (`"use client"`)
- ✅ Loading state with skeleton placeholders (8 cards)
- ✅ Error handling (returns null if error or no data)
- ✅ Responsive grid layout (2 cols mobile → 4 cols desktop)
- ✅ Uses RTK Query for automatic caching and refetching

**Props:**

```typescript
{
  id: string;
} // Product ID to get recommendations for
```

---

## Store Configuration

Updated `/client/store/store.ts` to include:

```typescript
import { recommendationApi } from "./services/recommendation";

// Added to reducers
[recommendationApi.reducerPath]: recommendationApi.reducer,

// Added to middleware
recommendationApi.middleware,
```

---

## Key Differences from Original

### Original (MongoDB/Server Actions):

- Used server-side actions with `"use server"`
- Direct database queries with Mongoose
- Async component with `await`

### New (.NET/RTK Query):

- Client-side component with `"use client"`
- API calls to .NET backend via RTK Query
- Automatic caching and state management
- Loading and error states built-in

---

## Recommendation Algorithm

### Matching Criteria:

**For Tops:**

- Matches on `style` (e.g., tShirt, casualShirt)
- Matches on `design` (e.g., solidColor, printed)

**For Bottoms:**

- Matches on `style` (e.g., joggers, cargoPants)
- No design field (bottoms don't have design attribute)

### Cross-Category Recommendations:

- When viewing a Top → Shows similar Tops + matching Bottoms
- When viewing a Bottom → Shows similar Bottoms + matching Tops

This creates a complete outfit recommendation system!

---

## Testing

### Test the endpoint:

```bash
# Get recommendations for a specific product
curl http://localhost:5175/api/v1/recommendation/{product-id}?sortBy=popular
```

### Expected behavior:

1. Returns products with similar style/design
2. Excludes the original product
3. Sorts according to the specified criteria
4. Returns mix of Tops and Bottoms

---

## Files Modified/Created

### Backend:

- ✅ **NEW**: `server/Controller/RecommendationController.cs`

### Frontend:

- ✅ **NEW**: `client/store/services/recommendation.ts`
- ✅ **MODIFIED**: `client/store/store.ts`
- ✅ **MODIFIED**: `client/app/(screen)/product/[id]/components/Recommendation.tsx`

---

## Summary

The recommendation system is now fully integrated with the .NET backend and uses Redux Toolkit Query for efficient state management. It provides intelligent product suggestions based on style and design similarity, with proper loading states and error handling.
