using System.ComponentModel.DataAnnotations;
using static server.Lib.Constant;

namespace server.Model.Entities;

public class User
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    public string? Name { get; set; }

    [Required]
    [EmailAddress]
    [MaxLength(255)]
    public required string Email { get; set; }

    [Phone]
    public string? Phone { get; set; }

    [MinLength(8)]
    public string? Password { get; set; }

    [Required]
    public ERole Role { get; set; }
    public string? ResetPasswordToken { get; set; } = string.Empty;
    public DateTime? ResetPasswordTokenExpiryTime { get; set; } = null;
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
