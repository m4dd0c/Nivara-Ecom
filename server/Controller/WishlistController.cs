using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Lib;

namespace server.Controller;

[ApiController]
[Route("/api/v1/[controller]")]
public class WishlistController : ControllerBase
{
    private readonly DbConfig _db;

    public WishlistController(DbConfig db)
    {
        _db = db;
    }

    /// <summary>
    /// Fetch wishlist items by IDs
    /// POST /api/v1/wishlist
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> FetchWishlist([FromBody] WishlistRequestDto request)
    {
        try
        {
            // Validate input
            if (request.Ids == null || request.Ids.Count == 0)
                return BadRequest(new { error = "Invalid or empty IDs array" });

            // Filter out invalid IDs
            var validIds = request.Ids.Where(id => id != Guid.Empty).ToList();

            // Fetch data from database
            var items = new List<object>();

            foreach (var id in validIds)
            {
                // Try to find in Bottoms first
                var bottom = await _db.Bottoms.FindAsync(id);
                if (bottom != null)
                {
                    items.Add(bottom);
                    continue;
                }

                // If not found in Bottoms, try Tops
                var top = await _db.Tops.FindAsync(id);
                if (top != null)
                {
                    items.Add(top);
                }
            }

            return Ok(items);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Internal Server Error", message = ex.Message });
        }
    }
}

// DTO
public class WishlistRequestDto
{
    public List<Guid> Ids { get; set; } = new();
}
