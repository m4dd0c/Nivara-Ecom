using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Lib;

namespace server.Controller;

[ApiController]
[Route("/api/v1/[controller]")]
public class FeaturedController : ControllerBase
{
    private readonly DbConfig _db;

    public FeaturedController(DbConfig db)
    {
        _db = db;
    }

    /// <summary>
    /// Get featured items (curated selection of tops and bottoms)
    /// GET /api/v1/featured
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetFeatured()
    {
        try
        {
            // Get tops sorted by creation date
            var tops = await _db.Tops.OrderBy(t => t.CreatedAt).ToListAsync();

            // Get track pants from bottoms
            var trackPants = await _db
                .Bottoms.Where(b => b.Style.Contains("trackPants"))
                .OrderBy(b => b.CreatedAt)
                .FirstOrDefaultAsync();

            // Find specific tops based on design/style
            var printedTop = tops.FirstOrDefault(t => t.Design.Contains("solidColor"));
            var graphicTop = tops.FirstOrDefault(t => t.Design.Contains("graphic"));
            var poloTShirt = tops.FirstOrDefault(t => t.Style.Contains("poloTShirt"));

            // Create featured data array
            var data = new List<object>();

            if (trackPants != null)
                data.Add(trackPants);
            if (printedTop != null)
                data.Add(printedTop);
            if (graphicTop != null)
                data.Add(graphicTop);
            if (poloTShirt != null)
                data.Add(poloTShirt);

            return Ok(new { data });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }
}
