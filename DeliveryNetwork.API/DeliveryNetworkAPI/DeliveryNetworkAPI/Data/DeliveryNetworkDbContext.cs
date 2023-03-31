using DeliveryNetworkAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace DeliveryNetworkAPI.Data
{
    public class DeliveryNetworkDbContext : DbContext
    {
        public DeliveryNetworkDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Users> Users { get; set; }
        public DbSet<Status> Status { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<Posts> Posts { get; set; }
        public DbSet<Persons> Persons { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<Manufactor> Manufactors { get; set; }
        public DbSet<Delivery> Delivery { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<CompanyInformation> companyInformation { get; set; }
    }
}
