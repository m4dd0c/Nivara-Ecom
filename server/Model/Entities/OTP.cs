using System.ComponentModel.DataAnnotations;

namespace server.Model.Entities;

public class OTP
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public required string Otp { get; set; }

    [Required]
    [EmailAddress]
    public required string Email { get; set; }
    public DateTime ExpiresAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
