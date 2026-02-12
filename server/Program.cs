using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using server.Lib;
using server.Model.Entities;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();
var _myCorsOrigin = "FrontendCors";
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        _myCorsOrigin,
        policy =>
        {
            policy.AllowAnyHeader();
            policy.WithMethods("GET", "POST", "PUT", "DELETE");
            policy.WithOrigins("http://localhost:3000");
        }
    );
});

builder.Services.AddControllers();
builder.Services.AddDbContext<DbConfig>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default"))
);
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<PasswordHasher<User>>();
builder.Services.AddScoped<ICloudinaryService, CloudinaryService>();

// jwt setup
var jwtKey =
    builder.Configuration["JWT:Key"]
    ?? throw new InvalidOperationException("JWT Key is missing in configuration.");
builder
    .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JWT:Issuer"],
            ValidAudience = builder.Configuration["JWT:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

// Must: line first!
app.UseMiddleware<server.Middlewares.ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options
            .WithTitle("E-Commerce API")
            .WithTheme(ScalarTheme.Purple)
            .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient);
    });
}
app.UseHttpsRedirection();
app.UseCors(_myCorsOrigin);
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
