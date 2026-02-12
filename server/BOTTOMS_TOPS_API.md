# E-Commerce API - Bottoms and Tops Endpoints Implementation

## Overview

Successfully created comprehensive REST API endpoints for managing Bottom and Top products in the .NET e-commerce server, mirroring the functionality from the TypeScript/Next.js client API routes.

## Created Files

### 1. Entity Models

- **`server/Model/Entities/Bottom.cs`** - Bottom product entity with all properties
- **`server/Model/Entities/Top.cs`** - Top product entity with all properties
- **`server/Model/Entities/Cart.cs`** - Cart entity for shopping cart functionality

### 2. Controllers

- **`server/Controller/BottomsController.cs`** - CRUD endpoints for bottoms
- **`server/Controller/TopsController.cs`** - CRUD endpoints for tops

### 3. Services

- **`server/Services/ICloudinaryService.cs`** - Interface for image upload service
- **`server/Services/CloudinaryService.cs`** - Cloudinary implementation for image management

### 4. Configuration Updates

- **`server/Lib/DbConfig.cs`** - Added DbSet properties and entity configurations
- **`server/Program.cs`** - Registered Cloudinary service
- **`server/appsettings.json`** - Added Cloudinary configuration section

## API Endpoints

### Bottoms Endpoints

#### POST `/api/v1/bottoms`

Create a new bottom item with image uploads

- **Request**: FormData with product details and images
- **Response**: Created bottom with 201 status

#### GET `/api/v1/bottoms`

Get all bottoms with filtering and sorting

- **Query Parameters**:
  - `q` - Search query (name/description)
  - `newArrival` - Filter by new arrivals (bool)
  - `trending` - Filter by trending (bool)
  - `fabric` - Filter by fabric (comma-separated)
  - `fit` - Filter by fit (comma-separated)
  - `style` - Filter by style (comma-separated)
  - `color` - Filter by color (comma-separated)
  - `size` - Filter by size (comma-separated)
  - `sort` - Sort by: newest, popular, top-rated, most-sold
  - `limit` - Results limit (default: 20)

#### GET `/api/v1/bottoms/{id}`

Get a specific bottom by ID (increments view count)

#### PUT `/api/v1/bottoms/{id}`

Update a bottom item (handles image replacement)

#### DELETE `/api/v1/bottoms/{id}`

Delete a bottom item (removes images from Cloudinary)

### Tops Endpoints

#### POST `/api/v1/tops`

Create a new top item with image uploads

#### GET `/api/v1/tops`

Get all tops with filtering and sorting

- **Additional Query Parameters** (beyond bottoms):
  - `design` - Filter by design
  - `occasion` - Filter by occasion
  - `season` - Filter by season
  - `sleeveType` - Filter by sleeve type
  - `seasonal` - Filter by seasonal items (bool)

#### GET `/api/v1/tops/{id}`

Get a specific top by ID (increments view count)

#### PUT `/api/v1/tops/{id}`

Update a top item (handles image replacement)

#### DELETE `/api/v1/tops/{id}`

Delete a top item (removes images from Cloudinary)

## Entity Models

### Bottom Model

```csharp
- Id (Guid)
- Name (string, required)
- Price (decimal, required)
- StrikePrice (decimal?, optional)
- Fabric (List<string>)
- Fit (List<string>)
- Style (List<string>)
- Size (List<string>)
- Color (List<string>)
- Quantity (int, default: 0)
- Description (string)
- Tax (decimal, default: 5)
- Sold (int, default: 0)
- Views (int, default: 0)
- Ratings (nested object: Total, Stars)
- MainImage (nested object: PublicId, SecureUrl)
- AdditionalImage (List of image objects)
- NewArrival (bool, default: false)
- Trending (bool, default: false)
- CreatedAt (DateTime)
- UpdatedAt (DateTime)
```

### Top Model

Same as Bottom, plus:

```csharp
- Design (List<string>)
- Occasion (List<string>)
- Season (List<string>)
- SleeveType (List<string>)
- Seasonal (bool, default: false)
```

### Cart Model

```csharp
- Id (Guid)
- UserId (Guid, foreign key to User)
- ItemId (Guid, references Top or Bottom)
- ItemType (enum: Top, Bottom)
- Quantity (int, required)
- Size (string, required)
- Color (string, required)
```

## Features Implemented

### 1. Image Management

- **Cloudinary Integration**: Upload and delete images
- **Main Image**: Required for product creation
- **Additional Images**: Optional multiple images
- **Automatic Cleanup**: Deletes old images when updating/deleting products

### 2. Filtering & Search

- **Text Search**: Search by name or description
- **Multi-value Filters**: Support comma-separated values for fabric, color, size, etc.
- **Boolean Filters**: newArrival, trending, seasonal
- **Flexible Querying**: All filters are optional

### 3. Sorting Options

- `newest` - Sort by creation date (descending)
- `oldest` - Sort by creation date (ascending) - Tops only
- `popular` - Sort by view count
- `top-rated` - Sort by rating stars
- `most-sold` - Sort by sold count
- Default: Sort by views

### 4. View Tracking

- Automatically increments view count when fetching individual products

### 5. Data Validation

- Required field validation
- Decimal precision for prices (18,2)
- Range validation for ratings (0-5)
- Enum conversion for ItemType in Cart

## Database Configuration

### Entity Framework Configuration

- **Owned Types**: Ratings and ImageInfo are configured as owned entities
- **Collections**: Fabric, Fit, Style, etc. stored as JSON in database
- **Timestamps**: Automatic UTC timestamp generation
- **Foreign Keys**: Cart has cascade delete relationship with User

## Configuration Required

### appsettings.json

Add your Cloudinary credentials:

```json
"Cloudinary": {
  "CloudName": "your_cloud_name",
  "ApiKey": "your_api_key",
  "ApiSecret": "your_api_secret"
}
```

## Dependencies Added

- **CloudinaryDotNet** (v1.28.0) - For image upload and management

## Next Steps

1. **Database Migration**: Run Entity Framework migrations to create the new tables

   ```bash
   dotnet ef migrations add AddBottomsTopsCarts
   dotnet ef database update
   ```

2. **Configure Cloudinary**: Update appsettings.json with your Cloudinary credentials

3. **Testing**: Test all endpoints using the Scalar API documentation at `/scalar/v1`

4. **Frontend Integration**: Update the Next.js client to call these new .NET endpoints instead of the old API routes

## Notes

- All endpoints follow RESTful conventions
- Error handling includes try-catch blocks with descriptive error messages
- Image uploads use FormData (multipart/form-data)
- All list properties (fabric, color, etc.) support multiple values
- The implementation matches the TypeScript API routes functionality
