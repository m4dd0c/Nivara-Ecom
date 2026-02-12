using Microsoft.EntityFrameworkCore;
using server.Lib;
using server.Model.Entities;

namespace server.Scripts;

public class SeedTops
{
    private readonly DbConfig _db;

    public SeedTops(DbConfig db)
    {
        _db = db;
    }

    public async Task SeedAsync(bool cleanup = false, bool force = false)
    {
        try
        {
            if (cleanup)
            {
                _db.Tops.RemoveRange(_db.Tops);
                await _db.SaveChangesAsync();
                Console.WriteLine("Tops cleanup successful!");
            }
            else
            {
                if (!force)
                {
                    var topsCount = await _db.Tops.CountAsync();
                    if (topsCount > 0)
                    {
                        Console.WriteLine("Tops already exist, Skipping seeding...");
                        return;
                    }
                }

                foreach (var top in SeedData.MockTops)
                {
                    await _db.Tops.AddAsync(top);
                }

                await _db.SaveChangesAsync();
                Console.WriteLine("Tops seeded successfully!");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error seeding Tops: {ex.Message}");
            throw;
        }
    }
}
