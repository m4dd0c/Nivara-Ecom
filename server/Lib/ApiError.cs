namespace server.Lib;

public class ApiError
{
    public int StatusCode { get; set; }
    public string Message { get; set; }
    public string? Details { get; set; }

    public ApiError(int StatusCode, string Message, string? Details = null)
    {
        this.StatusCode = StatusCode;
        this.Message = Message;
        this.Details = Details;
    }
}
