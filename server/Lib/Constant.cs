namespace server.Lib;

public static class Constant
{
    public const int OtpExpiryTime = 5;
    public const string OtpSubject = "Verify your email";

    public static string OtpBody(string otp) =>
        $"""
                <h1>Verify your email</h1>
                <p>Use this OTP to verify your email: <strong>{otp}</strong></p>
            """;

    public enum ERole
    {
        User,
        Admin,
    }
}
