using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Lib;
using server.Model.Entities;
using server.Services;

namespace server.Controller;

[ApiController]
[Route("/api/v1/[controller]")]
public class BottomsController : ControllerBase
{
    private readonly DbConfig _db;
    private readonly ICloudinaryService _cloudinaryService;

    public BottomsController(DbConfig db, ICloudinaryService cloudinaryService)
    {
        _db = db;
        _cloudinaryService = cloudinaryService;
    }

    // POST: /api/v1/bottoms - Create a new bottom item
    [HttpPost]
    public async Task<IActionResult> CreateBottom([FromForm] CreateBottomRequest request)
    {
        try
        {
            // Upload main image
            if (request.MainImage == null)
                return BadRequest(new { error = "Main image is required" });

            var mainImageResult = await _cloudinaryService.UploadImageAsync(
                request.MainImage,
                "bottoms"
            );

            // Upload additional images
            var additionalImages = new List<ImageInfo>();
            if (request.AdditionalImages != null && request.AdditionalImages.Any())
            {
                foreach (var file in request.AdditionalImages)
                {
                    var result = await _cloudinaryService.UploadImageAsync(file, "bottoms");
                    additionalImages.Add(
                        new ImageInfo { PublicId = result.PublicId, SecureUrl = result.SecureUrl }
                    );
                }
            }

            // Create bottom entity
            var bottom = new Bottom
            {
                Name = request.Name,
                Price = request.Price,
                StrikePrice = request.StrikePrice,
                Fabric = request.Fabric ?? new List<string>(),
                Fit = request.Fit ?? new List<string>(),
                Style = request.Style ?? new List<string>(),
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
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            _db.Bottoms.Add(bottom);
            await _db.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetBottomById),
                new { id = bottom.Id },
                new { message = "Bottom created successfully", bottom }
            );
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to create bottom", details = ex.Message });
        }
    }

    // GET: /api/v1/bottoms - Get all bottoms with filters
    [HttpGet]
    public async Task<IActionResult> GetBottoms(
        [FromQuery] string? q,
        [FromQuery] bool? newArrival,
        [FromQuery] bool? trending,
        [FromQuery] string? fabric,
        [FromQuery] string? style,
        [FromQuery] string? color,
        [FromQuery] string? size,
        [FromQuery] string? fit,
        [FromQuery] string? sort,
        [FromQuery] int limit = 20
    )
    {
        try
        {
            var query = _db.Bottoms.AsQueryable();

            // Search filter
            if (!string.IsNullOrEmpty(q))
            {
                query = query.Where(b => b.Name.Contains(q) || b.Description.Contains(q));
            }

            // Fabric filter
            if (!string.IsNullOrEmpty(fabric))
            {
                var fabrics = fabric.Split(',');
                query = query.Where(b => b.Fabric.Any(f => fabrics.Contains(f)));
            }

            // Fit filter
            if (!string.IsNullOrEmpty(fit))
            {
                var fits = fit.Split(',');
                query = query.Where(b => b.Fit.Any(f => fits.Contains(f)));
            }

            // Style filter
            if (!string.IsNullOrEmpty(style))
            {
                var styles = style.Split(',');
                query = query.Where(b => b.Style.Any(s => styles.Contains(s)));
            }

            // Color filter
            if (!string.IsNullOrEmpty(color))
            {
                var colors = color.Split(',');
                query = query.Where(b => b.Color.Any(c => colors.Contains(c)));
            }

            // Size filter
            if (!string.IsNullOrEmpty(size))
            {
                var sizes = size.Split(',');
                query = query.Where(b => b.Size.Any(s => sizes.Contains(s)));
            }

            // Boolean filters
            if (newArrival.HasValue)
                query = query.Where(b => b.NewArrival == newArrival.Value);

            if (trending.HasValue)
                query = query.Where(b => b.Trending == trending.Value);

            // Sorting
            query = sort switch
            {
                "newest" => query.OrderByDescending(b => b.CreatedAt),
                "popular" => query.OrderByDescending(b => b.Views),
                "top-rated" => query.OrderByDescending(b => b.Ratings.Stars),
                "most-sold" => query.OrderByDescending(b => b.Sold),
                _ => query.OrderByDescending(b => b.Views),
            };

            var bottoms = await query.Take(limit).ToListAsync();

            return Ok(new { size = bottoms.Count, bottoms });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to fetch bottoms", details = ex.Message });
        }
    }

    // GET: /api/v1/bottoms/{id} - Get bottom by ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetBottomById(Guid id)
    {
        try
        {
            var bottom = await _db.Bottoms.FindAsync(id);

            if (bottom == null)
                return NotFound(new { message = "No Bottom available with provided Id." });

            // Increment views
            bottom.Views += 1;
            bottom.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            return Ok(new { message = "Bottom fetched successfully", bottom });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to fetch bottom", details = ex.Message });
        }
    }

    // PUT: /api/v1/bottoms/{id} - Update bottom
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBottom(Guid id, [FromForm] UpdateBottomRequest request)
    {
        try
        {
            var existingBottom = await _db.Bottoms.FindAsync(id);

            if (existingBottom == null)
                return NotFound(new { message = "No Bottom available with provided Id." });

            // Update basic properties
            existingBottom.Name = request.Name ?? existingBottom.Name;
            existingBottom.Price = request.Price ?? existingBottom.Price;
            existingBottom.StrikePrice = request.StrikePrice ?? existingBottom.StrikePrice;
            existingBottom.Quantity = request.Quantity ?? existingBottom.Quantity;
            existingBottom.Description = request.Description ?? existingBottom.Description;

            // Update filters
            if (request.Fabric != null)
                existingBottom.Fabric = request.Fabric;
            if (request.Fit != null)
                existingBottom.Fit = request.Fit;
            if (request.Style != null)
                existingBottom.Style = request.Style;
            if (request.Size != null)
                existingBottom.Size = request.Size;
            if (request.Color != null)
                existingBottom.Color = request.Color;

            // Update main image if provided
            if (request.MainImage != null)
            {
                // Delete old image
                if (!string.IsNullOrEmpty(existingBottom.MainImage.PublicId))
                    await _cloudinaryService.DeleteImageAsync(existingBottom.MainImage.PublicId);

                // Upload new image
                var mainImageResult = await _cloudinaryService.UploadImageAsync(
                    request.MainImage,
                    "bottoms"
                );
                existingBottom.MainImage = new ImageInfo
                {
                    PublicId = mainImageResult.PublicId,
                    SecureUrl = mainImageResult.SecureUrl,
                };
            }

            // Update additional images if provided
            if (request.AdditionalImages != null && request.AdditionalImages.Any())
            {
                // Delete old images
                foreach (var img in existingBottom.AdditionalImage)
                {
                    if (!string.IsNullOrEmpty(img.PublicId))
                        await _cloudinaryService.DeleteImageAsync(img.PublicId);
                }

                // Upload new images
                var additionalImages = new List<ImageInfo>();
                foreach (var file in request.AdditionalImages)
                {
                    var result = await _cloudinaryService.UploadImageAsync(file, "bottoms");
                    additionalImages.Add(
                        new ImageInfo { PublicId = result.PublicId, SecureUrl = result.SecureUrl }
                    );
                }
                existingBottom.AdditionalImage = additionalImages;
            }

            existingBottom.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            return Ok(new { message = "Bottom updated successfully", bottom = existingBottom });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to update bottom", details = ex.Message });
        }
    }

    // DELETE: /api/v1/bottoms/{id} - Delete bottom
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBottom(Guid id)
    {
        try
        {
            var existingBottom = await _db.Bottoms.FindAsync(id);

            if (existingBottom == null)
                return NotFound(new { message = "No Bottom available with provided Id." });

            // Delete main image
            if (!string.IsNullOrEmpty(existingBottom.MainImage.PublicId))
                await _cloudinaryService.DeleteImageAsync(existingBottom.MainImage.PublicId);

            // Delete additional images
            foreach (var img in existingBottom.AdditionalImage)
            {
                if (!string.IsNullOrEmpty(img.PublicId))
                    await _cloudinaryService.DeleteImageAsync(img.PublicId);
            }

            _db.Bottoms.Remove(existingBottom);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Bottom deleted successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to delete bottom", details = ex.Message });
        }
    }
}

// Request DTOs
public class CreateBottomRequest
{
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? StrikePrice { get; set; }
    public List<string>? Fabric { get; set; }
    public List<string>? Fit { get; set; }
    public List<string>? Style { get; set; }
    public List<string>? Size { get; set; }
    public List<string>? Color { get; set; }
    public int Quantity { get; set; } = 0;
    public string? Description { get; set; }
    public decimal? Tax { get; set; }
    public bool NewArrival { get; set; } = false;
    public bool Trending { get; set; } = false;
    public IFormFile? MainImage { get; set; }
    public List<IFormFile>? AdditionalImages { get; set; }
}

public class UpdateBottomRequest
{
    public string? Name { get; set; }
    public decimal? Price { get; set; }
    public decimal? StrikePrice { get; set; }
    public List<string>? Fabric { get; set; }
    public List<string>? Fit { get; set; }
    public List<string>? Style { get; set; }
    public List<string>? Size { get; set; }
    public List<string>? Color { get; set; }
    public int? Quantity { get; set; }
    public string? Description { get; set; }
    public IFormFile? MainImage { get; set; }
    public List<IFormFile>? AdditionalImages { get; set; }
}
