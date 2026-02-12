using System.ComponentModel.DataAnnotations;

namespace server.Model;

public class SigninDto
{
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string Email { get; set; } = String.Empty;

    [Required(ErrorMessage = "Password is required.")]
    [MinLength(length: 8, ErrorMessage = "Password must have atleast 8 chars.")]
    public string Password { get; set; } = String.Empty;
}
