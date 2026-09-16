namespace WholesaleCatalog.Api.Models;

public sealed class Product
{
    public int Id { get; set; }
    public required string Code { get; set; }
    public required string Name { get; set; }
    public required string Category { get; set; }
    public required string Color { get; set; }
    public string[] Sizes { get; set; } = [];
    public int Stock { get; set; }
    public decimal WholesalePrice { get; set; }
    public required string Collection { get; set; }
    public bool IsActive { get; set; } = true;
}
