using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Lib;
using server.Model;
using server.Model.Entities;
using server.Services;

namespace server.Controller.Auth;

[ApiController]
[Route("/api/v1/[controller]")]
public class AuthController : ControllerBase
{
    private readonly DbConfig _db;
    private readonly PasswordHasher<User> _hasher;
    private readonly IEmailService _emailService;
    private readonly IConfiguration _config;

    public AuthController(
        DbConfig db,
        PasswordHasher<User> passwordHasher,
        IEmailService emailService,
        IConfiguration config
    )
    {
        _db = db;
        _hasher = passwordHasher;
        _emailService = emailService;
        _config = config;
    }

    [HttpPost("send-otp")]
    public async Task<IActionResult> SendOtp([FromQuery] string email)
    {
        if (string.IsNullOrEmpty(email))
            return BadRequest(new { message = "Email is required" });

        var userExists = await _db.Users.AnyAsync(u => u.Email == email);
        if (userExists)
            return BadRequest(new { message = "User already exists" });

        // create random otp
        string otp = Utils.GenerateOtp();

        // save otp in db
        var otpEntity = new OTP
        {
            Id = Guid.NewGuid(),
            Otp = otp,
            Email = email,
            ExpiresAt = DateTime.UtcNow.AddMinutes(15),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };

        _db.Otps.Add(otpEntity);
        await _db.SaveChangesAsync();

        // sending otp
        await _emailService.SendEmailAsync(email, Constant.OtpSubject, Constant.OtpBody(otp));
        return Ok(new { message = "OTP sent successfully" });
    }

    [HttpPost("verify-otp")]
    public async Task<ActionResult> VerifyOtp([FromBody] VerifyOtpDto verifyOtp)
    {
        if (string.IsNullOrEmpty(verifyOtp.Otp) && string.IsNullOrEmpty(verifyOtp.Email))
            return BadRequest(new { message = "Both OTP and Email are required" });

        var userExists = await _db.Users.AnyAsync(u => u.Email == verifyOtp.Email);
        if (userExists)
            return Ok(new { message = "User already exists, Please Login" });

        var otpEntity = await _db.Otps.FirstOrDefaultAsync(o =>
            o.Otp == verifyOtp.Otp && o.Email == verifyOtp.Email && o.ExpiresAt > DateTime.UtcNow
        );
        if (otpEntity == null)
            return BadRequest(new { message = "Invalid OTP, Try again" });

        var userEntity = new User
        {
            Id = Guid.NewGuid(),
            Email = verifyOtp.Email,
            Role = Constant.ERole.User,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
        };

        // remove otp and add user
        _db.Otps.Remove(otpEntity);
        _db.Users.Add(userEntity);
        await _db.SaveChangesAsync();
        return Ok(new { message = "OTP verified successfully" });
    }

    [HttpPost("sign-up")]
    public async Task<ActionResult> Signup([FromBody] SignupDto request)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user == null)
            return BadRequest(new { message = "Something went wrong." });

        string HashedPassword = _hasher.HashPassword(user, request.Password);
        string refreshToken = Utils.GenerateRefreshToken();

        if (
            string.IsNullOrEmpty(user.Name)
            && string.IsNullOrEmpty(user.Phone)
            && string.IsNullOrEmpty(user.Password)
        )
        {
            user.Name = request.Name;
            user.Phone = request.Phone;
            user.Password = HashedPassword;
            user.UpdatedAt = DateTime.UtcNow;
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
        }

        await _db.SaveChangesAsync();

        SetRefreshTokenCookie(refreshToken);
        var token = GenerateJWTToken(user);
        return Ok(new { token, message = "User Signed-up Successfully" });
    }

    [HttpPost("sign-in")]
    public async Task<ActionResult> Signin([FromBody] SigninDto request)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user == null)
            return BadRequest("Invalid Email or Password");

        if (user.Password == null)
            return BadRequest("Registration incomplete. Please verify email again.");

        // check password
        var result = _hasher.VerifyHashedPassword(user, user.Password, request.Password);
        if (result == PasswordVerificationResult.Failed)
            return BadRequest("Invalid Email or Password");

        // jwt Generate
        var token = GenerateJWTToken(user);
        return Ok(new { token, message = "User Signed-in Successfully" });
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<ActionResult> GetMe()
    {
        // Get user ID from JWT claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim))
            return Unauthorized("Invalid token");

        if (!Guid.TryParse(userIdClaim, out var userId))
            return BadRequest("Invalid user ID");

        // Fetch user from database
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null)
            return NotFound("User not found");

        var addresses = await _db.Addresses.Where(a => a.UserId == userId).ToListAsync();

        // Return user info (excluding sensitive data)
        return Ok(
            new
            {
                id = user.Id,
                name = user.Name,
                email = user.Email,
                phone = user.Phone,
                role = user.Role.ToString(),
                createdAt = user.CreatedAt,
                updatedAt = user.UpdatedAt,
                address = addresses
                    .Select(a => new
                    {
                        id = a.Id,
                        flatNo = a.FlatNo,
                        landmark = a.Landmark,
                        address = a.AddressLine,
                        pinCode = a.PinCode,
                        state = a.State,
                        district = a.District,
                        country = a.Country,
                        city = a.City,
                    })
                    .ToList(),
            }
        );
    }

    [HttpPut("update")]
    [Authorize]
    public async Task<ActionResult> UpdateUser([FromBody] UpdateUserDto request)
    {
        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized("Invalid token");

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
                return NotFound("User not found");

            if (!string.IsNullOrEmpty(request.Name))
                user.Name = request.Name;
            if (!string.IsNullOrEmpty(request.Phone))
                user.Phone = request.Phone;

            if (request.Address != null)
            {
                var address = new Address
                {
                    UserId = userId,
                    FlatNo = request.Address.FlatNo ?? "",
                    Landmark = request.Address.Landmark ?? "",
                    AddressLine = request.Address.Address ?? "",
                    PinCode = request.Address.PinCode ?? "",
                    State = request.Address.State ?? "",
                    District = request.Address.District ?? "",
                    Country = request.Address.Country ?? "",
                    City = request.Address.City ?? "",
                };
                _db.Addresses.Add(address);
            }

            user.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            return Ok(new { message = "User updated successfully", user });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message, stack = ex.StackTrace });
        }
    }

    private string GenerateJWTToken(User user)
    {
        // jwt is made of 3 things: 1. Algo+Details 2. Claims(payload) 3. Signature (secret_key + algo_work)

        // step 1: create claims
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Role, user.Role.ToString()),
            new(ClaimTypes.Email, user.Email),
            new("Name", user.Name ?? ""),
        };

        // step 2: create key
        var jwtKey = _config["JWT:Key"] ?? throw new Exception("JWT Key not provided!");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // step 3: set token
        var token = new JwtSecurityToken(
            issuer: _config["JWT:Issuer"],
            audience: _config["JWT:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    [HttpPost("refresh-token")]
    public async Task<ActionResult> RefreshToken()
    {
        // 1. Get Refresh Token from cookie
        var refreshToken = Request.Cookies["refreshToken"];
        if (string.IsNullOrEmpty(refreshToken))
            return Unauthorized("No refresh token provided.");

        // 2. Get the Access Token from the header to identify the user
        var authHeader = Request.Headers.Authorization.ToString();
        var expiredToken = authHeader.Replace("Bearer ", "");

        var principal = GetPrincipalFromExpiredToken(expiredToken);
        var email = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
        // 3. Validate
        if (
            user == null
            || user.RefreshToken != refreshToken
            || user.RefreshTokenExpiryTime <= DateTime.UtcNow
        )
            return BadRequest("Invalid or expired refresh token.");

        // 4. Generate new pair
        var newAccessToken = GenerateJWTToken(user);
        var newRefreshToken = Utils.GenerateRefreshToken();

        user.RefreshToken = newRefreshToken;
        await _db.SaveChangesAsync();

        SetRefreshTokenCookie(newRefreshToken);
        return Ok(new { accessToken = newAccessToken });
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("refreshToken");
        return Ok(new { message = "Logged out successfully" });
    }

    private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
    {
        var key = _config["JWT:Key"] ?? throw new Exception("JWT Key not provided!");
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
            ValidIssuer = _config["JWT:Issuer"],
            ValidAudience = _config["JWT:Audience"],
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var principal = tokenHandler.ValidateToken(
            token,
            tokenValidationParameters,
            out SecurityToken validatedToken
        );
        return principal;
    }

    private void SetRefreshTokenCookie(string refreshToken)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = false,
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.AddDays(7),
        };
        Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
    }
}

public class UpdateUserDto
{
    public string? Name { get; set; }
    public string? Phone { get; set; }
    public AddressDto? Address { get; set; }
}

public class AddressDto
{
    public string? FlatNo { get; set; }
    public string? Landmark { get; set; }
    public string? Address { get; set; }
    public string? PinCode { get; set; }
    public string? State { get; set; }
    public string? District { get; set; }
    public string? Country { get; set; }
    public string? City { get; set; }
}

public class VerifyOtpDto
{
    public string Otp { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}

public class SignupDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
}

public class SigninDto
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
