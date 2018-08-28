using Microsoft.EntityFrameworkCore;

namespace PrjFitCard.Model
{
    public class EstabelecimentoContext : DbContext
    {
        public DbSet<Estabelecimento> Estabelecimentos { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Status> Status { get; set; }
        public EstabelecimentoContext(DbContextOptions<EstabelecimentoContext> options) : base(options) { }
    }
}
