using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Model.Entities;

public class Top
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal? StrikePrice { get; set; }

    public List<string> Fabric { get; set; } = new List<string>();

    public List<string> Design { get; set; } = new List<string>();

    public List<string> Style { get; set; } = new List<string>();

    public List<string> Occasion { get; set; } = new List<string>();

    public List<string> Season { get; set; } = new List<string>();

    public List<string> Fit { get; set; } = new List<string>();

    public List<string> SleeveType { get; set; } = new List<string>();

    public List<string> Size { get; set; } = new List<string>();

    public List<string> Color { get; set; } = new List<string>();

    public int Quantity { get; set; } = 0;

    public string Description { get; set; } = string.Empty;

    public int Sold { get; set; } = 0;

    public int Views { get; set; } = 0;

    [Column(TypeName = "decimal(5,2)")]
    public decimal Tax { get; set; } = 5;

    public Ratings Ratings { get; set; } = new Ratings();

    public ImageInfo MainImage { get; set; } = new ImageInfo();

    public List<ImageInfo> AdditionalImage { get; set; } = new List<ImageInfo>();

    public bool NewArrival { get; set; } = false;

    public bool Trending { get; set; } = false;

    public bool Seasonal { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
