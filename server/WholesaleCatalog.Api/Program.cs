using Microsoft.EntityFrameworkCore;
using WholesaleCatalog.Api.Data;
using WholesaleCatalog.Api.Models;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("Catalog")
    ?? "Host=localhost;Port=5432;Database=wholesale_catalog;Username=postgres;Password=postgres";

builder.Services.AddDbContext<CatalogDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();
app.UseCors();
app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/api/products", async (CatalogDbContext db, string? search, string? category) =>
{
    var query = db.Products.AsNoTracking().Where(product => product.IsActive);
    if (!string.IsNullOrWhiteSpace(search)) query = query.Where(product => product.Name.ToLower().Contains(search.ToLower()) || product.Code.ToLower().Contains(search.ToLower()));
    if (!string.IsNullOrWhiteSpace(category) && category != "All") query = query.Where(product => product.Category == category);
    return Results.Ok(await query.OrderBy(product => product.Name).ToListAsync());
});

app.MapPost("/api/products", async (CatalogDbContext db, Product product) =>
{
    db.Products.Add(product);
    await db.SaveChangesAsync();
    return Results.Created($"/api/products/{product.Id}", product);
});

app.MapPut("/api/products/{id:int}/stock", async (CatalogDbContext db, int id, StockUpdate update) =>
{
    var product = await db.Products.FindAsync(id);
    if (product is null) return Results.NotFound();
    product.Stock = update.Stock;
    await db.SaveChangesAsync();
    return Results.Ok(product);
});

app.MapPost("/api/inquiries", (OrderInquiry inquiry) => Results.Accepted(value: new { inquiry.Email, Styles = inquiry.ProductIds.Count, Status = "Received" }));
app.Run();

public sealed record StockUpdate(int Stock);
public sealed record OrderInquiry(string Company, string Email, List<int> ProductIds);
