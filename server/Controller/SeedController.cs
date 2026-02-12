using Microsoft.AspNetCore.Mvc;
using server.Lib;
using server.Scripts;

namespace server.Controller;

[ApiController]
[Route("/api/v1/[controller]")]
public class SeedController : ControllerBase
{
    private readonly DbConfig _db;

    public SeedController(DbConfig db)
    {
        _db = db;
    }

    /// <summary>
    /// Seed all entities (Tops and Bottoms)
    /// GET /api/v1/seed
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> SeedAll(
        [FromQuery] bool cleanup = false,
        [FromQuery] bool force = false
    )
    {
        try
        {
            var seed = new Seed(_db);
            await seed.SeedDatabaseAsync(SeedTarget.All, cleanup, force);
            return Ok(new { message = "Database seeded successfully!" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = "Error seeding database", error = ex.Message });
        }
    }

    /// <summary>
    /// Seed only Tops
    /// GET /api/v1/seed/tops
    /// </summary>
    [HttpGet("tops")]
    public async Task<IActionResult> SeedTops(
        [FromQuery] bool cleanup = false,
        [FromQuery] bool force = false
    )
    {
        try
        {
            var seed = new Seed(_db);
            await seed.SeedDatabaseAsync(SeedTarget.Top, cleanup, force);
            return Ok(new { message = "Tops seeded successfully!" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = "Error seeding Tops", error = ex.Message });
        }
    }

    /// <summary>
    /// Seed only Bottoms
    /// GET /api/v1/seed/bottoms
    /// </summary>
    [HttpGet("bottoms")]
    public async Task<IActionResult> SeedBottoms(
        [FromQuery] bool cleanup = false,
        [FromQuery] bool force = false
    )
    {
        try
        {
            var seed = new Seed(_db);
            await seed.SeedDatabaseAsync(SeedTarget.Bottom, cleanup, force);
            return Ok(new { message = "Bottoms seeded successfully!" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = "Error seeding Bottoms", error = ex.Message });
        }
    }
}
