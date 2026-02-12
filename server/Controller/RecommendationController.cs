using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Lib;
using server.Model.Entities;

namespace server.Controller;

[ApiController]
[Route("/api/v1/[controller]")]
public class RecommendationController : ControllerBase
{
    private readonly DbConfig _db;

    public RecommendationController(DbConfig db)
    {
        _db = db;
    }

    // GET: /api/v1/recommendation/{id}?sortBy=newest
    [HttpGet("{id}")]
    public async Task<IActionResult> GetRecommendations(
        [FromRoute] Guid id,
        [FromQuery] string sortBy = "newest"
    )
    {
        try
        {
            // First, try to find the item in Tops
            var topItem = await _db.Tops.FindAsync(id);
            List<object> recommendations = new List<object>();

            if (topItem != null)
            {
                // Item is a Top - find similar tops and bottoms
                var similarTops = await GetSimilarTops(topItem, id, sortBy);
                var similarBottoms = await GetSimilarBottomsForTop(topItem, sortBy);

                recommendations.AddRange(similarTops);
                recommendations.AddRange(similarBottoms);
            }
            else
            {
                // Try to find in Bottoms
                var bottomItem = await _db.Bottoms.FindAsync(id);

                if (bottomItem == null)
                {
                    return NotFound(new { error = "Item not found" });
                }

                // Item is a Bottom - find similar bottoms and tops
                var similarBottoms = await GetSimilarBottoms(bottomItem, id, sortBy);
                var similarTops = await GetSimilarTopsForBottom(bottomItem, sortBy);

                recommendations.AddRange(similarBottoms);
                recommendations.AddRange(similarTops);
            }

            return Ok(new { size = recommendations.Count, data = recommendations });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in GetRecommendations: {ex.Message}");
            return StatusCode(500, new { error = "Internal server error", message = ex.Message });
        }
    }

    // Helper method to get similar Tops based on style and design
    private async Task<List<Top>> GetSimilarTops(Top item, Guid excludeId, string sortBy)
    {
        var query = _db.Tops.Where(t => t.Id != excludeId);

        // Filter by matching style or design
        query = query.Where(
            t =>
                t.Style.Any(s => item.Style.Contains(s))
                || t.Design.Any(d => item.Design.Contains(d))
        );

        // Apply sorting
        query = ApplySortingForTops(query, sortBy);

        return await query.Take(20).ToListAsync();
    }

    // Helper method to get similar Bottoms when the original item is a Top
    private async Task<List<Bottom>> GetSimilarBottomsForTop(Top item, string sortBy)
    {
        var query = _db.Bottoms.AsQueryable();

        // Filter by matching style (bottoms don't have design field)
        query = query.Where(b => b.Style.Any(s => item.Style.Contains(s)));

        // Apply sorting
        query = ApplySortingForBottoms(query, sortBy);

        return await query.Take(20).ToListAsync();
    }

    // Helper method to get similar Bottoms based on style
    private async Task<List<Bottom>> GetSimilarBottoms(Bottom item, Guid excludeId, string sortBy)
    {
        var query = _db.Bottoms.Where(b => b.Id != excludeId);

        // Filter by matching style
        query = query.Where(b => b.Style.Any(s => item.Style.Contains(s)));

        // Apply sorting
        query = ApplySortingForBottoms(query, sortBy);

        return await query.Take(20).ToListAsync();
    }

    // Helper method to get similar Tops when the original item is a Bottom
    private async Task<List<Top>> GetSimilarTopsForBottom(Bottom item, string sortBy)
    {
        var query = _db.Tops.AsQueryable();

        // Filter by matching style
        query = query.Where(t => t.Style.Any(s => item.Style.Contains(s)));

        // Apply sorting
        query = ApplySortingForTops(query, sortBy);

        return await query.Take(20).ToListAsync();
    }

    // Apply sorting for Tops
    private IQueryable<Top> ApplySortingForTops(IQueryable<Top> query, string sortBy)
    {
        return sortBy.ToLower() switch
        {
            "newest" => query.OrderByDescending(t => t.CreatedAt),
            "oldest" => query.OrderBy(t => t.CreatedAt),
            "popular" => query.OrderByDescending(t => t.Views),
            "top-rated" => query.OrderByDescending(t => t.Ratings.Stars),
            "most-sold" => query.OrderByDescending(t => t.Sold),
            _ => query.OrderByDescending(t => t.Views),
        };
    }

    // Apply sorting for Bottoms
    private IQueryable<Bottom> ApplySortingForBottoms(IQueryable<Bottom> query, string sortBy)
    {
        return sortBy.ToLower() switch
        {
            "newest" => query.OrderByDescending(b => b.CreatedAt),
            "oldest" => query.OrderBy(b => b.CreatedAt),
            "popular" => query.OrderByDescending(b => b.Views),
            "top-rated" => query.OrderByDescending(b => b.Ratings.Stars),
            "most-sold" => query.OrderByDescending(b => b.Sold),
            _ => query.OrderByDescending(b => b.Views),
        };
    }
}
