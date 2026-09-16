using Microsoft.EntityFrameworkCore;
using WholesaleCatalog.Api.Models;

namespace WholesaleCatalog.Api.Data;

public sealed class CatalogDbContext(DbContextOptions<CatalogDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>().HasIndex(product => product.Code).IsUnique();
        modelBuilder.Entity<Product>().Property(product => product.WholesalePrice).HasPrecision(10, 2);
    }
}
