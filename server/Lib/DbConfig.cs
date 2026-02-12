using Microsoft.EntityFrameworkCore;
using server.Model.Entities;

namespace server.Lib;

public class DbConfig : DbContext
{
    public DbConfig(DbContextOptions<DbConfig> options)
        : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<OTP> Otps { get; set; }
    public DbSet<Bottom> Bottoms { get; set; }
    public DbSet<Top> Tops { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<Address> Addresses { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderProduct> OrderProducts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(u => u.Role).HasConversion<string>();
            entity.Property(u => u.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            entity.Property(u => u.UpdatedAt).HasDefaultValueSql("GETUTCDATE()");
        });

        modelBuilder.Entity<Address>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity
                .HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<OTP>(entity =>
        {
            entity.Property(u => u.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            entity.Property(u => u.UpdatedAt).HasDefaultValueSql("GETUTCDATE()");
        });

        modelBuilder.Entity<Bottom>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.OwnsOne(
                e => e.Ratings,
                ratings =>
                {
                    ratings.Property(r => r.Stars).HasPrecision(3, 2);
                }
            );
            entity.OwnsOne(e => e.MainImage);
            entity.OwnsMany(e => e.AdditionalImage);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("GETUTCDATE()");
        });

        modelBuilder.Entity<Top>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.OwnsOne(
                e => e.Ratings,
                ratings =>
                {
                    ratings.Property(r => r.Stars).HasPrecision(3, 2);
                }
            );
            entity.OwnsOne(e => e.MainImage);
            entity.OwnsMany(e => e.AdditionalImage);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("GETUTCDATE()");
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.ItemType).HasConversion<string>();
            entity
                .HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Status).HasConversion<string>();
            entity.OwnsOne(e => e.Payment, p => p.Property(p => p.Status).HasConversion<string>());
            entity.OwnsOne(e => e.Price);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("GETUTCDATE()");
            entity.HasOne(e => e.User).WithMany().HasForeignKey(e => e.UserId);
        });

        modelBuilder.Entity<OrderProduct>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.ProductType).HasConversion<string>();
            entity
                .HasOne(e => e.Order)
                .WithMany(o => o.OrderProducts)
                .HasForeignKey(e => e.OrderId);
        });
    }
}
