using System.Security.Cryptography;

namespace server.Lib;

public static class Utils
{
    public static string GenerateOtp()
    {
        return new Random().Next(100000, 999999).ToString();
    }

    public static string GenerateRefreshToken()
    {
        var randomNumber = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }
}
