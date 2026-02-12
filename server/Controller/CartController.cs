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
public class CartController : ControllerBase
{
    private readonly DbConfig _db;

    public CartController(DbConfig db)
    {
        _db = db;
    }

    /// <summary>
    /// Add item to cart
    /// POST /api/v1/cart
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> AddToCart([FromBody] AddToCartDto request)
    {
        try
        {
            // Get user ID from JWT claims
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized(new { message = "Unauthorized access, please login again." });

            // Validate user existence
            var user = await _db.Users.FindAsync(userId);
            if (user == null)
                return Unauthorized(new { message = "Unauthorized access, please login again." });

            // Validate request
            if (!request.ItemId.HasValue || request.ItemId == Guid.Empty)
                return UnprocessableEntity(new { message = "Invalid item ID" });

            if (string.IsNullOrEmpty(request.Size))
                return UnprocessableEntity(new { message = "Please select a size." });

            if (string.IsNullOrEmpty(request.Color))
                return UnprocessableEntity(new { message = "Please select a color." });

            if (request.Quantity <= 0)
                return BadRequest(new { message = "Invalid quantity" });

            // Fetch item details by checking Top first, then Bottom
            ItemType itemType = ItemType.Top;
            int availableQuantity = 0;
            List<string> availableSizes = new();
            List<string> availableColors = new();

            var topItem = await _db.Tops.FindAsync(request.ItemId);
            if (topItem != null)
            {
                itemType = ItemType.Top;
                availableQuantity = topItem.Quantity;
                availableSizes = topItem.Size;
                availableColors = topItem.Color;
            }
            else
            {
                var bottomItem = await _db.Bottoms.FindAsync(request.ItemId);
                if (bottomItem != null)
                {
                    itemType = ItemType.Bottom;
                    availableQuantity = bottomItem.Quantity;
                    availableSizes = bottomItem.Size;
                    availableColors = bottomItem.Color;
                }
                else
                {
                    return NotFound(new { message = "Item couldn't be found." });
                }
            }

            // Check if size and color are available
            if (!availableSizes.Contains(request.Size))
                return NotFound(new { message = "Size not available, Select other size." });

            if (!availableColors.Contains(request.Color))
                return NotFound(new { message = "Color not available, Select other color." });

            // Check if cart item already exists
            var existingCartItem = await _db.Carts.FirstOrDefaultAsync(c =>
                c.ItemId == request.ItemId
                && c.UserId == userId
                && c.Size == request.Size
                && c.Color == request.Color
            );

            if (existingCartItem != null)
            {
                // Update quantity
                existingCartItem.Quantity = Math.Min(availableQuantity, request.Quantity);
                await _db.SaveChangesAsync();
            }
            else
            {
                // Create new cart item
                var newCartItem = new Cart
                {
                    UserId = userId,
                    ItemId = request.ItemId.Value,
                    Color = request.Color,
                    Size = request.Size,
                    ItemType = itemType,
                    Quantity = Math.Min(availableQuantity, request.Quantity),
                };

                _db.Carts.Add(newCartItem);
                await _db.SaveChangesAsync();
            }

            return Created("", new { message = "Cart updated successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Get all cart items for logged-in user
    /// GET /api/v1/cart
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized(new { message = "Unauthorized access, Please login again." });

            var user = await _db.Users.FindAsync(userId);
            if (user == null)
                return Unauthorized(new { message = "Unauthorized access, Please login again." });

            // Get all cart items with item details
            var carts = await _db
                .Carts.Where(c => c.UserId == userId)
                .Select(c => new
                {
                    c.Id,
                    c.ItemId,
                    c.ItemType,
                    c.Quantity,
                    c.Size,
                    c.Color,
                    Item = c.ItemType == ItemType.Top
                        ? (object?)_db.Tops.FirstOrDefault(t => t.Id == c.ItemId)
                        : (object?)_db.Bottoms.FirstOrDefault(b => b.Id == c.ItemId),
                })
                .ToListAsync();

            return Ok(
                new
                {
                    message = "Done",
                    carts,
                    size = carts.Count,
                }
            );
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Update cart item quantity
    /// PUT /api/v1/cart
    /// </summary>
    [HttpPut]
    public async Task<IActionResult> UpdateCart([FromBody] UpdateCartDto request)
    {
        try
        {
            if (request.Quantity <= 0)
                return UnprocessableEntity(new { message = "Invalid quantity" });

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized(new { message = "Unauthorized access, Please login again." });

            var user = await _db.Users.FindAsync(userId);
            if (user == null)
                return Unauthorized(new { message = "Unauthorized access, Please login again." });

            // Get cart item
            var cart = await _db.Carts.FindAsync(request.CartId);
            if (cart == null)
                return BadRequest(new { message = "Cart couldn't be found!" });

            // Get item to check available quantity
            int availableQuantity = 0;
            if (cart.ItemType == ItemType.Top)
            {
                var topItem = await _db.Tops.FindAsync(cart.ItemId);
                if (topItem == null)
                    return BadRequest(new { message = "Cart item no more exists." });
                availableQuantity = topItem.Quantity;
            }
            else
            {
                var bottomItem = await _db.Bottoms.FindAsync(cart.ItemId);
                if (bottomItem == null)
                    return BadRequest(new { message = "Cart item no more exists." });
                availableQuantity = bottomItem.Quantity;
            }

            // Update quantity
            cart.Quantity = Math.Min(availableQuantity, request.Quantity);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Cart updated successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Remove item from cart
    /// DELETE /api/v1/cart?cartId={cartId}
    /// </summary>
    [HttpDelete]
    public async Task<IActionResult> RemoveFromCart([FromQuery] Guid cartId)
    {
        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized(new { message = "Unauthorized access, Please login again." });

            var user = await _db.Users.FindAsync(userId);
            if (user == null)
                return Unauthorized(new { message = "Unauthorized access, Please login again." });

            var cart = await _db.Carts.FindAsync(cartId);
            if (cart == null)
                return BadRequest(new { message = "Cart item couldn't be found!" });

            _db.Carts.Remove(cart);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Removed from cart." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }
}

// DTOs
public class AddToCartDto
{
    public Guid? ItemId { get; set; }
    public int Quantity { get; set; }
    public string Size { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
}

public class UpdateCartDto
{
    public Guid CartId { get; set; }
    public int Quantity { get; set; }
}
