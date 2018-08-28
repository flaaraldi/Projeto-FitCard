using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PrjFitCard.Model
{
    [Table("estabelecimentos")]
    public class Estabelecimento
    {
        [Key]
        public int seq { get; set; }
        public string razao_social { get; set; }
        public string nome_fantasia { get; set; }
        public string cnpj { get; set; }
        public string email { get; set; }
        public string endereco { get; set; }
        public string cidade { get; set; }
        public string estado { get; set; }
        public string telefone { get; set; }
        public string conta { get; set; }
        public string agencia { get; set; }
        public int? id_categoria { get; set; }
        public int? id_status { get; set; }
        public DateTime? data_inclusao { get; set; }
    }


    //[Table("estabelecimento")]
    //public class Estabelecimento
    //{
    //    [Key]
    //    public int seq { get; set; }

    //    public string razao_social { get; set; }
    //    public string nome_fantasia { get; set; }
    //    public string cnpj { get; set; }
    //    public string email { get; set; }
    //    public string endereco { get; set; }
    //    public string cidade { get; set; }
    //    public string estado { get; set; }
    //    public string telefone { get; set; }
    //    public string categoria { get; set; }
    //    public string status { get; set; }
    //    public string conta { get; set; }
    //    public string agencia { get; set; }
    //    //public DateTime data_inclusao { get; set; }
    //}
}
