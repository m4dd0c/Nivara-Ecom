using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Lib;
using server.Model.Entities;
using server.Services;

namespace server.Controller;

[ApiController]
[Route("/api/v1/[controller]")]
public class PasswordController : ControllerBase
{
    private readonly DbConfig _db;
    private readonly PasswordHasher<User> _hasher;
    private readonly IEmailService _emailService;

    public PasswordController(
        DbConfig db,
        PasswordHasher<User> passwordHasher,
        IEmailService emailService
    )
    {
        _db = db;
        _hasher = passwordHasher;
        _emailService = emailService;
    }

    /// <summary>
    /// Change password for authenticated user
    /// PUT /api/v1/password/change
    /// </summary>
    [HttpPut("change")]
    [Authorize]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto request)
    {
        try
        {
            // Input validation
            if (
                string.IsNullOrEmpty(request.NewPassword)
                || string.IsNullOrEmpty(request.CurrPassword)
            )
                return UnprocessableEntity(new { message = "Please provide all required fields." });

            // User validation
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized(new { message = "Unauthorized access, Please login again." });

            var user = await _db.Users.FindAsync(userId);
            if (user == null || user.Password == null)
                return Unauthorized(new { message = "Unauthorized access, Please login again." });

            // Compare password
            var result = _hasher.VerifyHashedPassword(user, user.Password, request.CurrPassword);
            if (result == PasswordVerificationResult.Failed)
                return Unauthorized(
                    new { message = "You have entered incorrect credentials. Please try again." }
                );

            // Hash and save new password
            user.Password = _hasher.HashPassword(user, request.NewPassword);
            user.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            return Ok(new { message = "Password changed successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Send OTP for password reset
    /// PUT /api/v1/password/forget
    /// </summary>
    [HttpPut("forget")]
    public async Task<IActionResult> ForgetPassword([FromBody] ForgetPasswordDto request)
    {
        try
        {
            // Input validation
            if (string.IsNullOrEmpty(request.Email))
                return UnprocessableEntity(new { message = "Please provide an email address." });

            // User validation
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
                return Unauthorized(
                    new { message = "Account couldn't be found with given email address." }
                );

            // OTP generation
            var otp = Utils.GenerateOtp();

            // Send email
            try
            {
                await _emailService.SendEmailAsync(
                    request.Email,
                    "Password Reset OTP",
                    $@"
                        <h2>Password Reset Request</h2>
                        <p>You have requested to reset your password. Use the OTP below to reset your password:</p>
                        <h1 style='color: #4F46E5; font-size: 32px; letter-spacing: 5px;'>{otp}</h1>
                        <p>This OTP will expire in 5 minutes.</p>
                        <p>If you didn't request this, please ignore this email.</p>
                    "
                );
            }
            catch
            {
                return BadRequest(
                    new { message = "Couldn't send email at the moment, Please try again later." }
                );
            }

            // Update user with OTP and expiry
            user.ResetPasswordToken = otp;
            user.ResetPasswordTokenExpiryTime = DateTime.UtcNow.AddMinutes(5);
            user.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            return Ok(new { message = "An OTP is sent to your email address" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Reset password using OTP
    /// PUT /api/v1/password/reset/{otp}
    /// </summary>
    [HttpPut("reset/{otp}")]
    public async Task<IActionResult> ResetPassword(string otp, [FromBody] ResetPasswordDto request)
    {
        try
        {
            // Input validation
            if (string.IsNullOrEmpty(otp) || string.IsNullOrEmpty(request.Password))
                return UnprocessableEntity(new { message = "Please provide all required fields." });

            // User validation - find user with valid OTP
            var user = await _db.Users.FirstOrDefaultAsync(u =>
                u.ResetPasswordToken == otp
                && u.ResetPasswordTokenExpiryTime != null
                && u.ResetPasswordTokenExpiryTime > DateTime.UtcNow
            );

            if (user == null)
                return Unauthorized(
                    new { message = "Your OTP is either expired or altered, Please try again." }
                );

            // Hash and save new password
            user.Password = _hasher.HashPassword(user, request.Password);
            user.ResetPasswordToken = null;
            user.ResetPasswordTokenExpiryTime = null;
            user.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            return Ok(new { message = "Password changed successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }
}

// DTOs
public class ChangePasswordDto
{
    public string NewPassword { get; set; } = string.Empty;
    public string CurrPassword { get; set; } = string.Empty;
}

public class ForgetPasswordDto
{
    public string Email { get; set; } = string.Empty;
}

public class ResetPasswordDto
{
    public string Password { get; set; } = string.Empty;
}
