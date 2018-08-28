using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PrjFitCard.Model
{
    [Table("categorias")]
    public class Categoria
    {
        [Key]
        public int seq { get; set; }

        public string descricao { get; set; }
    }
}
