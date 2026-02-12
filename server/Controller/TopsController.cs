using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Lib;
using server.Model.Entities;
using server.Services;

namespace server.Controller;

[ApiController]
[Route("/api/v1/[controller]")]
public class TopsController : ControllerBase
{
    private readonly DbConfig _db;
    private readonly ICloudinaryService _cloudinaryService;

    public TopsController(DbConfig db, ICloudinaryService cloudinaryService)
    {
        _db = db;
        _cloudinaryService = cloudinaryService;
    }

    // POST: /api/v1/tops - Create a new top item
    [HttpPost]
    public async Task<IActionResult> CreateTop([FromForm] CreateTopRequest request)
    {
        try
        {
            // Upload main image
            if (request.MainImage == null)
                return BadRequest(new { error = "Main image is required" });

            var mainImageResult = await _cloudinaryService.UploadImageAsync(
                request.MainImage,
                "tops"
            );

            // Upload additional images
            var additionalImages = new List<ImageInfo>();
            if (request.AdditionalImages != null && request.AdditionalImages.Any())
            {
                foreach (var file in request.AdditionalImages)
                {
                    var result = await _cloudinaryService.UploadImageAsync(file, "tops");
                    additionalImages.Add(
                        new ImageInfo { PublicId = result.PublicId, SecureUrl = result.SecureUrl }
                    );
                }
            }

            // Create top entity
            var top = new Top
            {
                Name = request.Name,
                Price = request.Price,
                StrikePrice = request.StrikePrice,
                Fabric = request.Fabric ?? new List<string>(),
                Design = request.Design ?? new List<string>(),
                Style = request.Style ?? new List<string>(),
                Occasion = request.Occasion ?? new List<string>(),
                Season = request.Season ?? new List<string>(),
                Fit = request.Fit ?? new List<string>(),
                SleeveType = request.SleeveType ?? new List<string>(),
                Size = request.Size ?? new List<string>(),
                Color = request.Color ?? new List<string>(),
                Quantity = request.Quantity,
                Description = request.Description ?? string.Empty,
                Tax = request.Tax ?? 5,
                MainImage = new ImageInfo
                {
                    PublicId = mainImageResult.PublicId,
                    SecureUrl = mainImageResult.SecureUrl,
                },
                AdditionalImage = additionalImages,
                NewArrival = request.NewArrival,
                Trending = request.Trending,
                Seasonal = request.Seasonal,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            _db.Tops.Add(top);
            await _db.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetTopById),
                new { id = top.Id },
                new { message = "Top created successfully", top }
            );
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to create top", details = ex.Message });
        }
    }

    // GET: /api/v1/tops - Get all tops with filters
    [HttpGet]
    public async Task<IActionResult> GetTops(
        [FromQuery] string? q,
        [FromQuery] bool? newArrival,
        [FromQuery] bool? trending,
        [FromQuery] bool? seasonal,
        [FromQuery] string? fabric,
        [FromQuery] string? design,
        [FromQuery] string? style,
        [FromQuery] string? occasion,
        [FromQuery] string? season,
        [FromQuery] string? fit,
        [FromQuery] string? sleeveType,
        [FromQuery] string? color,
        [FromQuery] string? size,
        [FromQuery] string? sort,
        [FromQuery] int limit = 20
    )
    {
        try
        {
            var query = _db.Tops.AsQueryable();

            // Search filter
            if (!string.IsNullOrEmpty(q))
            {
                query = query.Where(t => t.Name.Contains(q) || t.Description.Contains(q));
            }

            // Fabric filter
            if (!string.IsNullOrEmpty(fabric))
            {
                var fabrics = fabric.Split(',');
                query = query.Where(t => t.Fabric.Any(f => fabrics.Contains(f)));
            }

            // Design filter
            if (!string.IsNullOrEmpty(design))
            {
                var designs = design.Split(',');
                query = query.Where(t => t.Design.Any(d => designs.Contains(d)));
            }

            // Style filter
            if (!string.IsNullOrEmpty(style))
            {
                var styles = style.Split(',');
                query = query.Where(t => t.Style.Any(s => styles.Contains(s)));
            }

            // Occasion filter
            if (!string.IsNullOrEmpty(occasion))
            {
                var occasions = occasion.Split(',');
                query = query.Where(t => t.Occasion.Any(o => occasions.Contains(o)));
            }

            // Season filter
            if (!string.IsNullOrEmpty(season))
            {
                var seasons = season.Split(',');
                query = query.Where(t => t.Season.Any(s => seasons.Contains(s)));
            }

            // Fit filter
            if (!string.IsNullOrEmpty(fit))
            {
                var fits = fit.Split(',');
                query = query.Where(t => t.Fit.Any(f => fits.Contains(f)));
            }

            // SleeveType filter
            if (!string.IsNullOrEmpty(sleeveType))
            {
                var sleeveTypes = sleeveType.Split(',');
                query = query.Where(t => t.SleeveType.Any(st => sleeveTypes.Contains(st)));
            }

            // Color filter
            if (!string.IsNullOrEmpty(color))
            {
                var colors = color.Split(',');
                query = query.Where(t => t.Color.Any(c => colors.Contains(c)));
            }

            // Size filter
            if (!string.IsNullOrEmpty(size))
            {
                var sizes = size.Split(',');
                query = query.Where(t => t.Size.Any(s => sizes.Contains(s)));
            }

            // Boolean filters
            if (newArrival.HasValue)
                query = query.Where(t => t.NewArrival == newArrival.Value);

            if (trending.HasValue)
                query = query.Where(t => t.Trending == trending.Value);

            if (seasonal.HasValue)
                query = query.Where(t => t.Seasonal == seasonal.Value);

            // Sorting
            query = sort switch
            {
                "newest" => query.OrderByDescending(t => t.CreatedAt),
                "oldest" => query.OrderBy(t => t.CreatedAt),
                "popular" => query.OrderByDescending(t => t.Views),
                "top-rated" => query.OrderByDescending(t => t.Ratings.Stars),
                "most-sold" => query.OrderByDescending(t => t.Sold),
                _ => query.OrderByDescending(t => t.Views),
            };

            var tops = await query.Take(limit).ToListAsync();

            return Ok(new { size = tops.Count, tops });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to fetch tops", details = ex.Message });
        }
    }

    // GET: /api/v1/tops/{id} - Get top by ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetTopById(Guid id)
    {
        try
        {
            var top = await _db.Tops.FindAsync(id);

            if (top == null)
                return NotFound(new { message = "No Top available with provided Id." });

            // Increment views
            top.Views += 1;
            top.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            return Ok(new { message = "Top fetched successfully", top });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to fetch top", details = ex.Message });
        }
    }

    // PUT: /api/v1/tops/{id} - Update top
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTop(Guid id, [FromForm] UpdateTopRequest request)
    {
        try
        {
            var existingTop = await _db.Tops.FindAsync(id);

            if (existingTop == null)
                return NotFound(new { message = "No Top available with provided Id." });

            // Update basic properties
            existingTop.Name = request.Name ?? existingTop.Name;
            existingTop.Price = request.Price ?? existingTop.Price;
            existingTop.StrikePrice = request.StrikePrice ?? existingTop.StrikePrice;
            existingTop.Quantity = request.Quantity ?? existingTop.Quantity;
            existingTop.Description = request.Description ?? existingTop.Description;

            // Update filters
            if (request.Fabric != null)
                existingTop.Fabric = request.Fabric;
            if (request.Design != null)
                existingTop.Design = request.Design;
            if (request.Style != null)
                existingTop.Style = request.Style;
            if (request.Occasion != null)
                existingTop.Occasion = request.Occasion;
            if (request.Season != null)
                existingTop.Season = request.Season;
            if (request.Fit != null)
                existingTop.Fit = request.Fit;
            if (request.SleeveType != null)
                existingTop.SleeveType = request.SleeveType;
            if (request.Size != null)
                existingTop.Size = request.Size;
            if (request.Color != null)
                existingTop.Color = request.Color;

            // Update main image if provided
            if (request.MainImage != null)
            {
                // Delete old image
                if (!string.IsNullOrEmpty(existingTop.MainImage.PublicId))
                    await _cloudinaryService.DeleteImageAsync(existingTop.MainImage.PublicId);

                // Upload new image
                var mainImageResult = await _cloudinaryService.UploadImageAsync(
                    request.MainImage,
                    "tops"
                );
                existingTop.MainImage = new ImageInfo
                {
                    PublicId = mainImageResult.PublicId,
                    SecureUrl = mainImageResult.SecureUrl,
                };
            }

            // Update additional images if provided
            if (request.AdditionalImages != null && request.AdditionalImages.Any())
            {
                // Delete old images
                foreach (var img in existingTop.AdditionalImage)
                {
                    if (!string.IsNullOrEmpty(img.PublicId))
                        await _cloudinaryService.DeleteImageAsync(img.PublicId);
                }

                // Upload new images
                var additionalImages = new List<ImageInfo>();
                foreach (var file in request.AdditionalImages)
                {
                    var result = await _cloudinaryService.UploadImageAsync(file, "tops");
                    additionalImages.Add(
                        new ImageInfo { PublicId = result.PublicId, SecureUrl = result.SecureUrl }
                    );
                }
                existingTop.AdditionalImage = additionalImages;
            }

            existingTop.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            return Ok(new { message = "Top updated successfully", top = existingTop });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to update top", details = ex.Message });
        }
    }

    // DELETE: /api/v1/tops/{id} - Delete top
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTop(Guid id)
    {
        try
        {
            var existingTop = await _db.Tops.FindAsync(id);

            if (existingTop == null)
                return NotFound(new { message = "No Top available with provided Id." });

            // Delete main image
            if (!string.IsNullOrEmpty(existingTop.MainImage.PublicId))
                await _cloudinaryService.DeleteImageAsync(existingTop.MainImage.PublicId);

            // Delete additional images
            foreach (var img in existingTop.AdditionalImage)
            {
                if (!string.IsNullOrEmpty(img.PublicId))
                    await _cloudinaryService.DeleteImageAsync(img.PublicId);
            }

            _db.Tops.Remove(existingTop);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Top deleted successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to delete top", details = ex.Message });
        }
    }
}

// Request DTOs
public class CreateTopRequest
{
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? StrikePrice { get; set; }
    public List<string>? Fabric { get; set; }
    public List<string>? Design { get; set; }
    public List<string>? Style { get; set; }
    public List<string>? Occasion { get; set; }
    public List<string>? Season { get; set; }
    public List<string>? Fit { get; set; }
    public List<string>? SleeveType { get; set; }
    public List<string>? Size { get; set; }
    public List<string>? Color { get; set; }
    public int Quantity { get; set; } = 0;
    public string? Description { get; set; }
    public decimal? Tax { get; set; }
    public bool NewArrival { get; set; } = false;
    public bool Trending { get; set; } = false;
    public bool Seasonal { get; set; } = false;
    public IFormFile? MainImage { get; set; }
    public List<IFormFile>? AdditionalImages { get; set; }
}

public class UpdateTopRequest
{
    public string? Name { get; set; }
    public decimal? Price { get; set; }
    public decimal? StrikePrice { get; set; }
    public List<string>? Fabric { get; set; }
    public List<string>? Design { get; set; }
    public List<string>? Style { get; set; }
    public List<string>? Occasion { get; set; }
    public List<string>? Season { get; set; }
    public List<string>? Fit { get; set; }
    public List<string>? SleeveType { get; set; }
    public List<string>? Size { get; set; }
    public List<string>? Color { get; set; }
    public int? Quantity { get; set; }
    public string? Description { get; set; }
    public IFormFile? MainImage { get; set; }
    public List<IFormFile>? AdditionalImages { get; set; }
}
