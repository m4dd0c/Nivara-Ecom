# Database Seeding Scripts

This directory contains scripts to seed the database with mock data for development and testing purposes.

## Files

- **SeedData.cs** - Contains mock data for Tops and Bottoms
- **SeedTops.cs** - Seeds Top entities
- **SeedBottoms.cs** - Seeds Bottom entities
- **Seed.cs** - Main orchestrator for seeding operations
- **SeedRunner.cs** - Alternative console runner (requires additional setup)

## Usage via API Endpoints

The easiest way to seed the database is through the API endpoints. Make sure your server is running first.

### Basic Seeding

Seed all entities (Tops and Bottoms):

```bash
curl http://localhost:5000/api/v1/seed
```

Or visit in browser:

```
http://localhost:5000/api/v1/seed
```

### Seed Specific Entities

Seed only Tops:

```bash
curl http://localhost:5000/api/v1/seed/tops
```

Seed only Bottoms:

```bash
curl http://localhost:5000/api/v1/seed/bottoms
```

### Cleanup (Delete All Data)

Remove all Tops:

```bash
curl "http://localhost:5000/api/v1/seed/tops?cleanup=true"
```

Remove all Bottoms:

```bash
curl "http://localhost:5000/api/v1/seed/bottoms?cleanup=true"
```

Remove all data:

```bash
curl "http://localhost:5000/api/v1/seed?cleanup=true"
```

### Force Seeding

Force seed even if data already exists (will add duplicates):

```bash
curl "http://localhost:5000/api/v1/seed?force=true"
```

Force seed Tops only:

```bash
curl "http://localhost:5000/api/v1/seed/tops?force=true"
```

## API Endpoints

- `GET /api/v1/seed` - Seed all entities
- `GET /api/v1/seed/tops` - Seed only Tops
- `GET /api/v1/seed/bottoms` - Seed only Bottoms

### Query Parameters

- `cleanup` (bool) - Remove all existing data instead of seeding (default: false)
- `force` (bool) - Force seeding even if data already exists (default: false)

## Examples

```bash
# Seed everything
curl http://localhost:5000/api/v1/seed

# Clean up and reseed Tops
curl "http://localhost:5000/api/v1/seed/tops?cleanup=true"
curl http://localhost:5000/api/v1/seed/tops

# Force seed Bottoms (add duplicates)
curl "http://localhost:5000/api/v1/seed/bottoms?force=true"

# Cleanup all and reseed
curl "http://localhost:5000/api/v1/seed?cleanup=true"
curl http://localhost:5000/api/v1/seed
```

## Data Included

### Tops (7 items)

1. Cotton Polo T-Shirt
2. Cotton T-Shirt
3. Printed Graphic Hoodie
4. Raincoat
5. Linen Casual Shirt
6. Denim Jacket
7. Woolen Sweater

### Bottoms (5 items)

1. Cotton Cargo Pants
2. Linen Joggers
3. Denim Shorts
4. Polyester Track Pants
5. Woolen Trousers

## Notes

- The seed data is identical to the TypeScript seed data in the `client/scripts` directory
- All items include images, ratings, pricing, and detailed attributes
- The seeder checks if data already exists before seeding (unless `--force` is used)
- Use `--cleanup` to remove all data before reseeding for a fresh start
