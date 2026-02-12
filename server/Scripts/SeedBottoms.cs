using Microsoft.EntityFrameworkCore;
using server.Lib;
using server.Model.Entities;

namespace server.Scripts;

public class SeedBottoms
{
    private readonly DbConfig _db;

    public SeedBottoms(DbConfig db)
    {
        _db = db;
    }

    public async Task SeedAsync(bool cleanup = false, bool force = false)
    {
        try
        {
            if (cleanup)
            {
                _db.Bottoms.RemoveRange(_db.Bottoms);
                await _db.SaveChangesAsync();
                Console.WriteLine("Bottoms cleanup successful!");
            }
            else
            {
                if (!force)
                {
                    var bottomsCount = await _db.Bottoms.CountAsync();
                    if (bottomsCount > 0)
                    {
                        Console.WriteLine("Bottoms already exist, Skipping seeding...");
                        return;
                    }
                }

                foreach (var bottom in SeedData.MockBottoms)
                {
                    await _db.Bottoms.AddAsync(bottom);
                }

                await _db.SaveChangesAsync();
                Console.WriteLine("Bottoms seeded successfully!");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error seeding Bottoms: {ex.Message}");
            throw;
        }
    }
}
