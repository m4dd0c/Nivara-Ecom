using System.ComponentModel.DataAnnotations;

namespace server.Model;

public class VerifyOtpDto
{
    [Required(ErrorMessage = "OTP is required")]
    public string Otp { get; set; } = String.Empty;

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid Email")]
    public string Email { get; set; } = String.Empty;
}
