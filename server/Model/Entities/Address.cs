using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Model.Entities;

public class Address
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public User? User { get; set; }

    public string FlatNo { get; set; } = string.Empty;
    public string Landmark { get; set; } = string.Empty;
    public string AddressLine { get; set; } = string.Empty;
    public string PinCode { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string District { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
