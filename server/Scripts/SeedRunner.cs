using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using server.Lib;
using server.Scripts;

namespace server;

/// <summary>
/// Seed Runner - Console application to seed the database
/// Usage:
///   dotnet run --project server/SeedRunner.csproj
///   dotnet run --project server/SeedRunner.csproj -- --target top
///   dotnet run --project server/SeedRunner.csproj -- --target bottom
///   dotnet run --project server/SeedRunner.csproj -- --cleanup
///   dotnet run --project server/SeedRunner.csproj -- --force
///   dotnet run --project server/SeedRunner.csproj -- --target top --cleanup
/// </summary>
public class SeedRunner
{
    public static async Task Main(string[] args)
    {
        // Parse command line arguments
        var target = SeedTarget.All;
        var cleanup = false;
        var force = false;

        for (int i = 0; i < args.Length; i++)
        {
            switch (args[i].ToLower())
            {
                case "--target":
                    if (i + 1 < args.Length)
                    {
                        target = args[i + 1].ToLower() switch
                        {
                            "top" => SeedTarget.Top,
                            "bottom" => SeedTarget.Bottom,
                            "all" => SeedTarget.All,
                            _ => SeedTarget.All,
                        };
                        i++;
                    }
                    break;

                case "--cleanup":
                case "--destroy":
                    cleanup = true;
                    break;

                case "--force":
                    force = true;
                    break;
            }
        }

        // Build configuration
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddJsonFile(
                $"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development"}.json",
                optional: true
            )
            .AddEnvironmentVariables()
            .Build();

        // Setup DbContext
        var optionsBuilder = new DbContextOptionsBuilder<DbConfig>();
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        optionsBuilder.UseSqlServer(connectionString);

        using var db = new DbConfig(optionsBuilder.Options);

        // Ensure database is created
        await db.Database.EnsureCreatedAsync();

        Console.WriteLine("=== Database Seeding Started ===");
        Console.WriteLine($"Target: {target}");
        Console.WriteLine($"Cleanup: {cleanup}");
        Console.WriteLine($"Force: {force}");
        Console.WriteLine("================================\n");

        // Run seeding
        var seed = new Seed(db);
        await seed.SeedDatabaseAsync(target, cleanup, force);

        Console.WriteLine("\n=== Database Seeding Completed ===");
    }
}
