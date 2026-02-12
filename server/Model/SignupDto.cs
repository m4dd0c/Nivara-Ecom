using System.ComponentModel.DataAnnotations;

namespace server.Model;

public class SignupDto
{
    [Required(ErrorMessage = "Name is required")]
    [MinLength(length: 3, ErrorMessage = "Name must have at least 3 chars.")]
    public string Name { get; set; } = String.Empty;

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Please provide a valid email")]
    public string Email { get; set; } = String.Empty;

    [Required(ErrorMessage = "Phone number is required")]
    [Phone(ErrorMessage = "Please provide a valid phone number")]
    public string Phone { get; set; } = String.Empty;

    [Required(ErrorMessage = "Password is required")]
    [MinLength(length: 8, ErrorMessage = "Password must have at least 8 chars.")]
    public string Password { get; set; } = String.Empty;
}
