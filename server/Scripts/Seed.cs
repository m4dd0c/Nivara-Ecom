using Microsoft.EntityFrameworkCore;
using server.Lib;

namespace server.Scripts;

public enum SeedTarget
{
    Top,
    Bottom,
    All,
}

public class Seed
{
    private readonly DbConfig _db;

    public Seed(DbConfig db)
    {
        _db = db;
    }

    public async Task SeedDatabaseAsync(
        SeedTarget target = SeedTarget.All,
        bool cleanup = false,
        bool force = false
    )
    {
        try
        {
            switch (target)
            {
                case SeedTarget.Top:
                    var seedTops = new SeedTops(_db);
                    await seedTops.SeedAsync(cleanup, force);
                    break;

                case SeedTarget.Bottom:
                    var seedBottoms = new SeedBottoms(_db);
                    await seedBottoms.SeedAsync(cleanup, force);
                    break;

                case SeedTarget.All:
                default:
                    var seedAllTops = new SeedTops(_db);
                    var seedAllBottoms = new SeedBottoms(_db);
                    await seedAllTops.SeedAsync(cleanup, force);
                    await seedAllBottoms.SeedAsync(cleanup, force);
                    break;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error seeding database: {ex.Message}");
            throw;
        }
    }
}
