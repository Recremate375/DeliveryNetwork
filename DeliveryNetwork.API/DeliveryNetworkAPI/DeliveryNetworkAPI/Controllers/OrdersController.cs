using DeliveryNetworkAPI.Data;
using DeliveryNetworkAPI.Models;
using DeliveryNetworkAPI.Models.RequestModels;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Linq;

namespace DeliveryNetworkAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly DeliveryNetworkDbContext _context;
        public OrdersController(DeliveryNetworkDbContext context)
        {
            _context = context;
        }

        [HttpGet] // Получение всех заказов из базы данных
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = _context.Orders.Include(x => x.Products).Include(x => x.Status).
                Include(x => x.Customer).ThenInclude(u => u.UserID.Person.post).Include(x => x.Delivery).
                Include(x => x.Executor.Person.post).Include(x => x.Delivery).ToList();
            var products = _context.Products.ToList();
            List<RequestOrders> orders1 = new List<RequestOrders>();
            foreach (var order in orders)
            {
                var product = _context.Products.FirstOrDefault(x => x.ID == order.Delivery.ProductID);
                RequestOrders order1 = new RequestOrders();
                order1.ID = order.ID;
                order1.Customer = order.Customer.UserID.Person.Surname + " "
                    + order.Customer.UserID.Person.Name + " " + order.Customer.UserID.Person.LastName;
                order1.Address = order.Address;
                order1.Products = order.allProducts;
                order1.Status = order.Status.status;
                if (order.Executor != null)
                {
                    order1.Executor = order.Executor.Login;
                }
                orders1.Add(order1);
            }
            return Ok(orders1);
        }

        [HttpPost] //В данном методе происходит добавление заказа в базу данных 
        public async Task<IActionResult> AddOrder([FromBody] CreateOrderClass requestOrders)
        {
            Orders order = new Orders();

            Guid id = Guid.NewGuid();

            Customer customer = new Customer();

            //Получение данных пользователя, который сделал заказ из базы данных.
            var customerUser = _context.Users.Include(x => x.Person.post).FirstOrDefault(x => x.Login == requestOrders.customer);

            if (customerUser != null)
            {
                customer.ID = new Guid();
                customer.Address = requestOrders.address;
                customer.UserID = customerUser;
            }

            string strProduct = requestOrders.products.Substring(0, requestOrders.products.IndexOf(' ') - 1);
            var product = await _context.Products.FirstOrDefaultAsync(x => x.ID == Guid.Parse("4ED27096-6DD8-4B6F-884A-32FEA259B144"));

            Delivery delivery = new Delivery
            {
                ID = Guid.NewGuid(),
                ProductID = product.ID,
                Address = requestOrders.address,
                DateOfDelivery = DateTime.Now.AddDays(5)
            };

            //Получение статуса из БД
            Status status = _context.Status.FirstOrDefault(x => x.ID == Guid.Parse("0087713E-1BE2-4ACF-9C77-D898EAD9841E"));

            order.ID = id;
            order.Status = status;
            order.DateOfStartOrder = DateTime.Now;
            order.Address = requestOrders.address;
            order.Delivery = delivery;
            order.Customer = customer;
            order.allProducts = requestOrders.products;
            //order.Products.Add(product);
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
            return Ok(order);
        }

        [HttpGet] //Получение информации о заказах для пользователя
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetOrdersForUser([FromRoute]Guid id)
        {
            //Получение всех заказов в переменную для того, чтобы выбрать заказы определённого пользователя
            var orders = _context.Orders.Include(x => x.Products).Include(x => x.Status).
                Include(x => x.Customer).ThenInclude(u => u.UserID.Person.post).Include(x => x.Delivery).Include(x => x.Executor.Person.post).
                Include(x => x.Delivery).Where(x => x.Customer.UserID.ID == id).ToList();
            List<RequestOrders> orders1 = new List<RequestOrders>();
            foreach (var order in orders)
            {
                //добавление требуемых заказов в список для вывода
                RequestOrders order1 = new RequestOrders();
                order1.ID = order.ID;
                order1.Customer = order.Customer.UserID.Person.Surname + " "
                    + order.Customer.UserID.Person.Name + " " + order.Customer.UserID.Person.LastName;
                order1.Address = order.Address;
                order1.Products = order.allProducts;
                if (order.Executor != null)
                {
                    order1.Executor = order.Executor.Login;
                }
                order1.Status = order.Status.status;
                orders1.Add(order1);

            }
            return Ok(orders1);
        }

        [HttpGet] //Функция получения истории заказов для доставщиков.
        [Route("/api/Orders/GetAllOrdersForDeliveryMan/{id:Guid}")]
        public async Task<IActionResult> GetOrdersForDeliveryMan([FromRoute]Guid id)
        {
            //Получение всех заказов в переменную для того, чтобы выбрать заказы определённого пользователя
            var orders = _context.Orders.Include(x => x.Products).Include(x => x.Status).
                Include(x => x.Customer).ThenInclude(u => u.UserID.Person.post).Include(x => x.Delivery).Include(x => x.Executor.Person.post).
                Include(x => x.Delivery).Where(x => x.ExecutorID == id).ToList();

            List<RequestOrders> orders1 = new List<RequestOrders>();
            foreach (var order in orders)
            {
                //добавление требуемых заказов в список для вывода
                RequestOrders order1 = new RequestOrders();
                order1.ID = order.ID;
                order1.Customer = order.Customer.UserID.Person.Surname + " "
                    + order.Customer.UserID.Person.Name + " " + order.Customer.UserID.Person.LastName;
                order1.Address = order.Address;
                order1.Products = order.allProducts;
                if (order.Executor != null)
                {
                    order1.Executor = order.Executor.Login;
                }
                order1.Status = order.Status.status;
                orders1.Add(order1);

            }
            return Ok(orders1);
        }

        [HttpGet] //Метод получения всех адресов для доставщика
        [Route("/api/Orders/GetAllPathsForMan/{id:Guid}")]
        public async Task<IActionResult> GetAddressForDeliveryMan([FromRoute]Guid id)
        {
            var status = await _context.Status.FirstOrDefaultAsync(x => x.status == "In progress");
            var orders = await _context.Orders.Include(x => x.Executor).
                Include(x => x.Status).Where(x => x.ExecutorID == id && x.Status.ID == status.ID).ToListAsync(); //Получение всех заказов, где id исполнителя = переданному id
            List<string> Paths = new List<string>();

            foreach (var order in orders)
            {
                Paths.Add(order.Address);
            }
            return Ok(Paths);
        }

        [HttpPut] // Метод изменения заказа (добавление исполнителя)
        [Route("{id:Guid}")]
        public async Task<IActionResult> AddExecutor([FromRoute] Guid id, RequestOrders orderRequest)
        {
            //Получение заказа по переданному ID
            var order = await _context.Orders.Include(x => x.Products).Include(x => x.Status).
                Include(x => x.Customer).ThenInclude(u => u.UserID.Person.post).Include(x => x.Delivery).
                Include(x => x.Executor.Person.post).Include(x => x.Delivery).FirstOrDefaultAsync(x => x.ID == id);

            if (order == null)
            {
                return NotFound();
            }

            Status status = _context.Status.FirstOrDefault(x => x.ID == Guid.Parse("1F5F5982-C3AC-4E24-8D77-08C841D62796"));

            //Получение пользователя, которого нужно добавить в исполнителя.
            Users user = await _context.Users.Include(x => x.Person).
                ThenInclude(x => x.post).FirstOrDefaultAsync(x => x.Login == orderRequest.Executor);

            order.Executor = user;
            order.Status = status;
            //Сохранение данных в БД
            await _context.SaveChangesAsync();

            return Ok(order);
        }
        [HttpPut] //Функция изменения статуса у заказа на "Completed" 
        [Route("/api/Orders/CompleteOrder/{id:Guid}")]
        public async Task<IActionResult> CompleteOrder([FromRoute] Guid id, RequestOrders requestOrders)
        {
            //Получение заказа по переданному ID 
            var order = await _context.Orders.Include(x => x.Products).Include(x => x.Status).
                Include(x => x.Customer).ThenInclude(u => u.UserID.Person.post).Include(x => x.Delivery).
                Include(x => x.Executor.Person.post).Include(x => x.Delivery).FirstOrDefaultAsync(x => x.ID == id);

            if (order == null)
            {
                return NotFound();
            }

            //Получение статуса из БД
            var status = await _context.Status.FirstOrDefaultAsync(x => x.status == "Completed");

            order.Status = status;

            await _context.SaveChangesAsync();
            return Ok(order);
        }
    }
}
