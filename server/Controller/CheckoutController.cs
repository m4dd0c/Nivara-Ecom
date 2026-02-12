using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Lib;
using server.Model.Entities;

namespace server.Controller;

[ApiController]
[Route("/api/v1/[controller]")]
[Authorize]
public class CheckoutController : ControllerBase
{
    private readonly DbConfig _db;

    public CheckoutController(DbConfig db)
    {
        _db = db;
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto request)
    {
        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized(new { message = "Unauthorized access." });

            if (request.Products == null || !request.Products.Any())
                return BadRequest(new { message = "No products provided." });

            decimal subTotal = 0;
            var orderProducts = new List<OrderProduct>();

            foreach (var item in request.Products)
            {
                decimal price = 0;
                ItemType type = ItemType.Top;

                var top = await _db.Tops.FindAsync(item.Id);
                if (top != null)
                {
                    price = top.Price;
                    type = ItemType.Top;
                }
                else
                {
                    var bottom = await _db.Bottoms.FindAsync(item.Id);
                    if (bottom != null)
                    {
                        price = bottom.Price;
                        type = ItemType.Bottom;
                    }
                    else
                    {
                        return NotFound(new { message = $"Product with ID {item.Id} not found." });
                    }
                }

                subTotal += price * item.Quantity;
                orderProducts.Add(
                    new OrderProduct
                    {
                        ProductId = item.Id,
                        ProductType = type,
                        Quantity = item.Quantity,
                        Size = item.Size,
                        Color = item.Color,
                        PriceAtPurchase = price,
                    }
                );
            }

            decimal tax = subTotal * 0.05m; // 5% tax example
            decimal total = subTotal + tax;

            var order = new Order
            {
                UserId = userId,
                ReceiverName = request.ReceiverName ?? "Customer",
                MobileNumber = request.MobileNumber ?? "",
                Email = request.Email ?? "",
                Address = request.Address,
                Status = OrderStatus.Processing,
                Price = new PriceInfo
                {
                    SubTotal = subTotal,
                    Tax = tax,
                    Total = total,
                    Discount = 0,
                },
                Payment = new PaymentInfo
                {
                    PaymentId = "MOCK_" + Guid.NewGuid().ToString("N"),
                    Status = PaymentStatus.Success,
                },
            };

            _db.Orders.Add(order);
            await _db.SaveChangesAsync();

            foreach (var op in orderProducts)
            {
                op.OrderId = order.Id;
            }
            _db.OrderProducts.AddRange(orderProducts);

            // Clear the cart for this user
            var userCarts = await _db.Carts.Where(c => c.UserId == userId).ToListAsync();
            _db.Carts.RemoveRange(userCarts);

            await _db.SaveChangesAsync();

            return Ok(new { message = "Order created successfully", orderId = order.Id });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetUserOrders()
    {
        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized(new { message = "Unauthorized access." });

            var orders = await _db
                .Orders.Where(o => o.UserId == userId)
                .Include(o => o.OrderProducts)
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();

            var result = new List<object>();
            foreach (var o in orders)
            {
                var products = new List<object>();
                foreach (var op in o.OrderProducts)
                {
                    object? pData = null;
                    if (op.ProductType == ItemType.Top)
                    {
                        pData = await _db.Tops.FindAsync(op.ProductId);
                    }
                    else
                    {
                        pData = await _db.Bottoms.FindAsync(op.ProductId);
                    }
                    products.Add(
                        new
                        {
                            productId = pData,
                            quantity = op.Quantity,
                            size = op.Size,
                            color = op.Color,
                            priceAtPurchase = op.PriceAtPurchase,
                        }
                    );
                }

                object? addressData = null;
                if (Guid.TryParse(o.Address, out var addressId))
                {
                    addressData = await _db.Addresses.FindAsync(addressId);
                }

                result.Add(
                    new
                    {
                        id = o.Id,
                        createdAt = o.CreatedAt,
                        status = o.Status.ToString(),
                        price = o.Price,
                        payment = o.Payment,
                        address = addressData ?? new { address = o.Address }, // Fallback if not found
                        product = products,
                        receiverName = o.ReceiverName,
                        mobileNumber = o.MobileNumber,
                        email = o.Email,
                    }
                );
            }

            return Ok(new { orders = result });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrderById(Guid id)
    {
        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized(new { message = "Unauthorized access." });

            var order = await _db
                .Orders.Include(o => o.OrderProducts)
                .FirstOrDefaultAsync(o => o.Id == id && o.UserId == userId);

            if (order == null)
                return NotFound(new { message = "Order not found." });

            var products = new List<object>();
            foreach (var op in order.OrderProducts)
            {
                object? pData = null;
                if (op.ProductType == ItemType.Top)
                {
                    pData = await _db.Tops.FindAsync(op.ProductId);
                }
                else
                {
                    pData = await _db.Bottoms.FindAsync(op.ProductId);
                }
                products.Add(
                    new
                    {
                        productId = pData,
                        quantity = op.Quantity,
                        size = op.Size,
                        color = op.Color,
                        priceAtPurchase = op.PriceAtPurchase,
                    }
                );
            }

            object? addressData = null;
            if (Guid.TryParse(order.Address, out var addressId))
            {
                addressData = await _db.Addresses.FindAsync(addressId);
            }

            var result = new
            {
                id = order.Id,
                createdAt = order.CreatedAt,
                status = order.Status.ToString(),
                price = order.Price,
                payment = order.Payment,
                address = addressData ?? new { address = order.Address },
                product = products,
                receiverName = order.ReceiverName,
                mobileNumber = order.MobileNumber,
                email = order.Email,
            };

            return Ok(new { order = result });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }
}

public class CreateOrderDto
{
    public string? ReceiverName { get; set; }
    public string? MobileNumber { get; set; }
    public string? Email { get; set; }
    public string Address { get; set; } = string.Empty;
    public List<OrderProductDto> Products { get; set; } = new List<OrderProductDto>();
}

public class OrderProductDto
{
    public Guid Id { get; set; }
    public int Quantity { get; set; }
    public string Size { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
}
