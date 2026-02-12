using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Model.Entities;

public class Order
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public User? User { get; set; }

    [Required]
    public string ReceiverName { get; set; } = string.Empty;

    [Required]
    public string MobileNumber { get; set; } = string.Empty;

    [Required]
    public string Email { get; set; } = string.Empty;

    // We'll store address as a simple JSON string or separate fields for simplicity here
    // as we don't have a separate Address table yet (User has a list of addresses in frontend, but backend User model doesn't show it yet)
    [Required]
    public string Address { get; set; } = string.Empty;

    public List<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();

    [Required]
    public OrderStatus Status { get; set; } = OrderStatus.Processing;

    public PaymentInfo Payment { get; set; } = new PaymentInfo();

    public PriceInfo Price { get; set; } = new PriceInfo();

    public DateTime? DeliveryDate { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class OrderProduct
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid OrderId { get; set; }

    [ForeignKey(nameof(OrderId))]
    public Order? Order { get; set; }

    [Required]
    public Guid ProductId { get; set; }

    [Required]
    public ItemType ProductType { get; set; }

    [Required]
    public int Quantity { get; set; }

    [Required]
    public string Size { get; set; } = string.Empty;

    [Required]
    public string Color { get; set; } = string.Empty;

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal PriceAtPurchase { get; set; }
}

public enum OrderStatus
{
    Processing,
    Shipped,
    Delivered,
    Cancelled,
}

public class PaymentInfo
{
    public string PaymentId { get; set; } = string.Empty;
    public string TransactionId { get; set; } = string.Empty;
    public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
}

public enum PaymentStatus
{
    Pending,
    Success,
    Failed,
}

public class PriceInfo
{
    [Column(TypeName = "decimal(18,2)")]
    public decimal Total { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal SubTotal { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Tax { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Discount { get; set; }
}
