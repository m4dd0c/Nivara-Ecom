using System.ComponentModel.DataAnnotations;

namespace server.Model;

public class RefreshTokenDto
{
    [Required(ErrorMessage = "Refresh Token is required")]
    public required string RefreshToken { get; set; }

    [Required(ErrorMessage = "Access Token is required")]
    public required string AccessToken { get; set; }
}
