using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PrjFitCard.Model
{
    [Table("status")]
    public class Status
    {
        [Key]
        public int seq { get; set; }

        public string descricao { get; set; }
    }
}
