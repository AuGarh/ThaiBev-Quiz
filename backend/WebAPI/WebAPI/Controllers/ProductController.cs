using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductDbContext dbContext;
        private static int _nextId = 1;

        public ProductController(ProductDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetProductList()
        {
            var products = dbContext.Products.OrderBy(p => p.Id).ToList();
            return Ok(products);
        }

        [HttpPost]
        public IActionResult AddProduct(AddRequestDTO request)
        {
            var newProduct = new Product
            {
                Id = _nextId++,
                ProductCode = request.ProductCode
            };

            dbContext.Products.Add(newProduct);
            dbContext.SaveChanges();

            return Ok(newProduct);
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = dbContext.Products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            dbContext.Products.Remove(product);
            dbContext.SaveChanges();

            return Ok();
        }
    }
}
