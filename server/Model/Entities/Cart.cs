using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Model.Entities;

public class Cart
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public User? User { get; set; }

    [Required]
    public Guid ItemId { get; set; }

    [Required]
    public ItemType ItemType { get; set; }

    [Required]
    public int Quantity { get; set; }

    [Required]
    public string Size { get; set; } = string.Empty;

    [Required]
    public string Color { get; set; } = string.Empty;
}

public enum ItemType
{
    Top,
    Bottom,
}
