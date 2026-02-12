using System.Net;
using System.Net.Mail;

namespace server.Services;

public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string body);
}

public class EmailService : IEmailService
{
    private readonly IConfiguration _config;

    public EmailService(IConfiguration config)
    {
        _config = config;
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        var smtpHost = _config["SMTP:Host"] ?? "smtp.gmail.com"; // default to "smtp.gmail.com"
        var smtpPort = int.Parse(_config["SMTP:Port"] ?? "578"); // default to 578
        var user = _config["SMTP:User"];
        var pass = _config["SMTP:Pass"];

        // creating transporter
        using var client = new SmtpClient(smtpHost, smtpPort)
        {
            Credentials = new NetworkCredential(user, pass),
            EnableSsl = true,
        };
        // creating email
        var mailMessage = new MailMessage
        {
            From = new MailAddress(user!),
            Subject = subject,
            Body = body,
            IsBodyHtml = true,
        };
        // adding recepient
        mailMessage.To.Add(to);

        // sending mail
        await client.SendMailAsync(mailMessage);
    }
}
